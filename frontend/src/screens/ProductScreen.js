import { parseRequestUrl } from "../utils";
import { getProduct } from "../api";
import Rating from "../components/Rating";

const ProductScreen = {
  render: async () => {
    const request = parseRequestUrl();
    const product = await getProduct(request.id);
    if (product.error) {
      return `<div>${product.error}</div>`;
    }
    return `
        <div class="content">
            <div class="back-to-menu">
                <a href="/#/">Powrót</a>
            </div>
            <div class="details">
                <div class="details-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="details-info">
                    <ul>
                        <li>
                            <h1>${product.name}</h1>
                        </li>
                        <li>
                            ${Rating.render({
                            value: product.rating,
                            text: `${product.numReviews} reviews`,
                            })}
                        </li>
                        <li>
                            Cena: <strong>${product.price}zl</strong>
                        </li>
                        <li>
                            Opis:
                            <div> ${product.description}</div>
                        </li>
                    </ul>
                </div>
                <div class="details-action">
                    <ul>
                        <li>Cena: ${product.price}zl</li>
                        <li>Status: ${product.countInStock >0
                        ?`<span class="success">W magazynie</span>`
                        :`<span class="error">Niedostepny</span>`
                        }
                        </li>
                        <li>
                            <button id="add-button" class="fw primary">Dodaj do koszyka</button>
                        </li>
                    </ul>
                </div>    
            </div>    
        </div>`;
  },
};
export default ProductScreen;
