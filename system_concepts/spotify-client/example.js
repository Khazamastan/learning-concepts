/**
 * Spotify Web API helper using node-spotify-api-lite.
 * Lists playlists and optionally adds a track to a playlist.
 */
import "dotenv/config";
import { URL } from "node:url";
import readline from "node:readline/promises";
import SpotifyWebApi from "spotify-web-api-node";

const { SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET, SPOTIPY_REDIRECT_URI } = process.env;

if (!SPOTIPY_CLIENT_ID || !SPOTIPY_CLIENT_SECRET || !SPOTIPY_REDIRECT_URI) {
  console.error("Set SPOTIPY_CLIENT_ID, SPOTIPY_CLIENT_SECRET, and SPOTIPY_REDIRECT_URI.");
  process.exit(1);
}

const args = process.argv.slice(2);
const playlistUrlArgIndex = args.indexOf("--playlist-url");
const addTrackArgIndex = args.indexOf("--add-track");
const playlistUrl = playlistUrlArgIndex >= 0 ? args[playlistUrlArgIndex + 1] : undefined;
const trackUrl = addTrackArgIndex >= 0 ? args[addTrackArgIndex + 1] : undefined;

const scopes = ["playlist-read-private", "playlist-modify-private", "playlist-modify-public"];

async function authenticate() {
  const spotify = new SpotifyWebApi({
    clientId: SPOTIPY_CLIENT_ID,
    clientSecret: SPOTIPY_CLIENT_SECRET,
    redirectUri: SPOTIPY_REDIRECT_URI,
  });
  const authUrl = spotify.createAuthorizeURL(scopes, crypto.randomUUID(), true);
  console.log("Open this URL to authorize:", authUrl);
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const code = await rl.question("Paste the authorization code: ");
  rl.close();
  const { body } = await spotify.authorizationCodeGrant(code.trim());
  spotify.setAccessToken(body.access_token);
  spotify.setRefreshToken(body.refresh_token);
  return spotify;
}

function playlistIdFromUrl(url) {
  const parsed = new URL(url);
  const parts = parsed.pathname.split("/").filter(Boolean);
  if (parts[0] !== "playlist" || !parts[1]) {
    throw new Error("Expected playlist URL like https://open.spotify.com/playlist/<id>");
  }
  return parts[1];
}

async function listPlaylists(sp) {
  const { body } = await sp.getUserPlaylists({ limit: 50 });
  const playlists = body.items.map((item) => ({
    name: item.name,
    id: item.id,
    tracks: item.tracks.total,
  }));
  console.log("Your playlists:");
  playlists.forEach((playlist) => {
    console.log(`- ${playlist.name} (${playlist.tracks} tracks) https://open.spotify.com/playlist/${playlist.id}`);
  });
}

async function addTrack(sp, playlistId, track) {
  await sp.addTracksToPlaylist(playlistId, [track]);
  console.log(`Added ${track} to playlist ${playlistId}`);
}

(async function main() {
  const client = await authenticate();
  await listPlaylists(client);
  if (playlistUrl && trackUrl) {
    const playlistId = playlistIdFromUrl(playlistUrl);
    await addTrack(client, playlistId, trackUrl);
  } else if (trackUrl && !playlistUrl) {
    console.error("--add-track requires --playlist-url");
  }
})();
