import path from 'node:path';
import { fileURLToPath } from 'node:url';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const protoPath = path.join(__dirname, 'catalog.proto');

const packageDefinition = protoLoader.loadSync(protoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const catalogProto = grpc.loadPackageDefinition(packageDefinition).catalog;

const client = new catalogProto.CatalogService('localhost:50051', grpc.credentials.createInsecure());

function getProduct(id) {
  return new Promise((resolve, reject) => {
    client.GetProduct({ id }, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response);
    });
  });
}

function listProducts() {
  return new Promise((resolve, reject) => {
    const items = [];
    const stream = client.ListProducts({});
    stream.on('data', (item) => items.push(item));
    stream.on('end', () => resolve(items));
    stream.on('error', (error) => reject(error));
  });
}

(async () => {
  try {
    const catalog = await listProducts();
    console.log('All products from server-stream:');
    console.table(catalog);

    const specific = await getProduct('p2');
    console.log('Single product response:', specific);
  } catch (error) {
    console.error('Client error', error);
  }
})();
