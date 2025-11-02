export async function GET() {
const products = [
{ id: 'p1', name: 'Laptop', price: 999, category: 'Electronics', stock: 5 },
{ id: 'p2', name: 'Phone', price: 799, category: 'Electronics', stock: 4 },
{ id: 'p3', name: 'Headphones', price: 199, category: 'Electronics', stock: 7 },
{ id: 'p4', name: 'Desk Chair', price: 150, category: 'Furniture', stock: 3 },
{ id: 'p5', name: 'Standing Desk', price: 350, category: 'Furniture', stock: 2 },
{ id: 'p6', name: 'Lamp', price: 40, category: 'Home', stock: 6 },
{ id: 'p7', name: 'Coffee Maker', price: 80, category: 'Home', stock: 5 },
{ id: 'p8', name: 'Hoodie', price: 50, category: 'Clothing', stock: 8 },
{ id: 'p9', name: 'Shoes', price: 120, category: 'Clothing', stock: 10 },
];
return Response.json(products);
}