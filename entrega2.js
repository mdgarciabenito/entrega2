const fs = require('fs');


class ProductManager {
    constructor(filePath) {
        this.products = [];
        this.nextId = 1;
        this.path = filePath; // clase debe contar con variable this.path 
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('Todos los campos son obligatorios');
            return;
        }

        const codeExists = this.products.some(product => product.code === code);
        if (codeExists) {
            console.error('El código ya está en uso');
            return;
        }

        const product = {
            id: this.nextId++,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };

        this.products.push(product);
        this.saveToFile(); // clase debe guardar objetos 
    }

    saveToFile() {
        const data = JSON.stringify(this.products, null, "\t"); // Convertir el array a formato JSON con formato
        fs.writeFileSync(this.path, data, 'utf8', (error) => {
            if (error) {
                console.error('Error al guardar el archivo:', error);
            } else {
                console.log('Archivo guardado');
            }
        });
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.error('No encontrado');
        }
    }

    updateProduct(id, updated) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            console.error('Producto no encontrado');
            return;
        }

        const updatedProduct = { ...this.products[productIndex], ...updated };
        this.products[productIndex] = updatedProduct;
        this.saveToFile();
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);

        if (productIndex === -1) {
            console.error('Producto no encontrado');
            return;
        }

        this.products.splice(productIndex, 1);
        this.saveToFile();
    }


}



const manager = new ProductManager('productos.json');
manager.addProduct('Taza Mágica 1', 'Taza mágica donde aparece imagen sublimada al vertir agua caliente', 20, 'thumbnail1.jpg', 'TM001', 100);
manager.addProduct('Taza Plástica 1', 'Taza plástica con imagen sublimada', 10, 'thumbnail2.jpg', 'TP002', 50);

const productos = manager.getProducts();
console.log(productos);

const product = manager.getProductById(1);
console.log(product);

manager.updateProduct(2, { price: 15, stock: 75 });

const updatedProductos = manager.getProducts();
console.log(updatedProductos);

manager.deleteProduct(1);
console.log(productos);

