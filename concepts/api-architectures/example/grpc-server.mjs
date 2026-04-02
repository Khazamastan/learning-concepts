import path from 'node:path';
import { fileURLToPath } from 'node:url';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import { products } from './data.mjs';

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

function getProduct(call, callback) {
  const product = products.find((item) => item.id === call.request.id);
  if (!product) {
    return callback({ code: grpc.status.NOT_FOUND, message: 'Product not found' });
  }
  callback(null, product);
}

function listProducts(call) {
  products.forEach((product) => call.write(product));
  call.end();
}

const server = new grpc.Server();
server.addService(catalogProto.CatalogService.service, {
  GetProduct: getProduct,
  ListProducts: listProducts
});

const address = '0.0.0.0:50051';
server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (error, port) => {
  if (error) {
    console.error('Failed to start gRPC server', error);
    return;
  }
  console.log(`gRPC server listening on ${address}`);
  server.start();
});
