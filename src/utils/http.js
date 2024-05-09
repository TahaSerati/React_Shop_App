export async function getProducts() {
     const response = await fetch('http://localhost:3000/products');
     const dataRes = await response.json();
     // console.log(dataRes)
     return dataRes;
} 

export async function getProductWithId(id) {
     const response = await fetch('http://localhost:3000/products');
     const dataRes = await response.json();
     // console.log(dataRes)
     return dataRes.find((product) => product.id === id);
} 

export async function updateProduct() {}
export async function deleteProduct() {}
