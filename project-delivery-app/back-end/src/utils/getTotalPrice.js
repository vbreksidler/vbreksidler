function getTotalPrice(products) {
    const totalPrice = products
        .reduce((acc, product) => 
            acc + Number(product.price) * Number(product.quantity), 0);
    return totalPrice.toFixed(2);
}

module.exports = getTotalPrice;
