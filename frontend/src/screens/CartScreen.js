import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl } from "../utils";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find((x) => x.product === item.product);
  if (existItem) {
    cartItems = cartItems.map((x) =>
      x.product === existItem.product ? item : x
    );
  } else {
    cartItems = [...cartItems, item];
  }
  setCartItems();
};
const CartScreen = {
  after_render: () => {},
  render: async () => {
    const request = parseRequestUrl();
    if (request.id) {
      const product = await getProduct(request.id);
      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInStock,
        qty: 1,
      });
    }
    const cartItems = getCartItems();
    return `
	<div class="cart">
		<div class="cart-list">
			<ul class="class-list-container">
				<li>
					<h3>Twoje Zakupy</h3>
					<div>Cena</div>
				</li>
				${
          cartItems.length === 0
            ? '<div>Koszyk jest pusty. <a href="/#/>Dalsze Zakupy</a>'
            : cartItems
                .map(
                  (item) => `
					<li>
						<div class="cart-image">
							<img src="${item.image}" alt="${item.name}" />
						</div>
						<div class="cart-name">
							<div>
								<a href="/#/product/${item.product}">
									${item.name}
								</a>
							</div>
							<div>
								Ilosc: <select class="qty-select" id="${item.product}">
								<option value="1">1</option>
								</select>
								<button type="button" class="delete-button" id="${item.product}">
								Delete
								</button>
							</div>
						</div>
						<div class="cart-price">
						 ${item.price}zl
						</div>
					</li>
					`
                )
                .join("\n")
        }
			</ul>
		</div>
	</div>
	`;
  },
};

export default CartScreen;
