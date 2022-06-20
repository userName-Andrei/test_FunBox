import { useState } from 'react';
import classNames from 'classnames';
import './styles/App.scss';

const App = () => {
  const [products, setProducts] = useState(
    [
      {
        id: 1,
        name: "Нямушка",
        ingredient: "с фуа-гра",
        description: "Печень утки разварная с артишоками.",
        offer: "10 порций",
        present: "мышь в подарок",
        weight: "0,5",
        state: "default"
      },
      {
        id: 2,
        name: "Нямушка",
        ingredient: "с рыбой",
        description: "Головы щучьи с чесноком да свежайшая сёмгушка.",
        offer: "40 порций",
        present: "2 мыши в подарок",
        weight: "2",
        state: "default"
      },
      {
        id: 3,
        name: "Нямушка",
        ingredient: "с курой",
        description: "Филе из цыплят с трюфелями в бульоне.",
        offer: "100 порций",
        present: "5 мышей в подарок",
        weight: "5",
        state: "disabled"
      }
    ]
  );
  const [cart, setCart] = useState([]);


  // add product on cart 
  const onClick = (product) => {
    if (product.state === 'disabled') return;
    
    if (cart.some(item => item.id === product.id)) {
      setCart(cart => cart.filter(item => item.id !== product.id));
      setProducts(products => (
        products.map(item => {
          if (item.id !== product.id) return item;
          return {...item, state: 'default'}
        })
      ))
    } else {
      setCart(cart => ([
        ...cart, 
        {
          ...product,
          state: 'selected'
        }
      ]));
      setProducts(products => (
        products.map(item => {
          if (item.id !== product.id) return item;
          return {...item, state: 'selected'}
        })
      ))
    }
  }

  // add .selected-hovered when mouseover on product item second time
  const onMouseEnter = (product) => {
    if (product.state === 'selected') setProducts(products => products.map(item => {
      if (item.id !== product.id) return item;
      return {...item, state: 'selected-hovered'}
    }))
  }

  // add .selected when mouseleave on product item second time
  const onMouseLeave = (product) => {
    if (product.state === 'selected-hovered') setProducts(products => products.map(item => {
      if (item.id !== product.id) return item;
      return {...item, state: 'selected'}
    }))
  }

  const drawProducts = (products) => {
    return products.map(product => {

      return <Product product={product}
                      key={product.id}
                      onClick={onClick}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave} />
    })
  }
  
  return (
    <div className="app container">
      <div className="hidden">
        <svg xmlns="http://www.w3.org/2000/svg">
          <symbol id="card-outline" viewBox="0 0 320 480">
            <path d="M43.85 2H308c5.54 0 10 4.46 10 10v456c0 5.54-4.46 10-10 10H12c-5.54 0-10-4.46-10-10V43.85z" strokeWidth="4"></path>
          </symbol>
        </svg>
      </div>
      <h1 className="app__title">Ты сегодня покормил кота?</h1>
      <ul className="app__list list-app">
        {drawProducts(products)}
      </ul>
    </div>
  );
}

const Product = (props) => {
  const {product, onClick, onMouseLeave, onMouseEnter} = props;
  const defaultColor = "#1698D9";
  const hoverColor = "#2EA8E6";
  const selectedColor = "#D91667";
  const selectedHoverColor = "#E52E7A";
  const disabledColor = "#B3B3B3";

  const className = classNames({
    'list-app__item': true,
    'list-app__item_hovered': product.state === 'hovered',
    'list-app__item_selected': product.state === 'selected',
    'list-app__item_selected-hovered': product.state === 'selected-hovered',
    'list-app__item_disabled': product.state === 'disabled',
  });

  return (
    <li className={className}
        onMouseEnter={() => onMouseEnter(product)}
        onMouseLeave={() => onMouseLeave(product)}>
      <div className='card'
           onClick={() => onClick(product)}>
        <svg className="product-border">
          <use href="#card-outline" stroke={product.state === 'hovered' ? hoverColor :
                                            product.state === 'selected' ? selectedColor :
                                            product.state === 'selected-hovered' ? selectedHoverColor :
                                            product.state === 'disabled' ? disabledColor : defaultColor}></use>
        </svg>
        <div className="card__text">
          <div className="card__top">{product.state === "selected-hovered" ? 'Котэ не одобряет?' : 'Сказочное заморское яство'}</div>
          <div className="card__title">{product.name}</div>
          <div className="card__subtitle">{product.ingredient}</div>
          <div className="card__down">
            <p>{product.offer}</p>
            <p>{product.present}</p>
            <p>{product.weight >= 5 ? 'заказчик доволен' : null}</p>
          </div>
        </div>
        <div className="weight">
          <p className='weight__int'>{product.weight}</p>
          <p className='weight__unit'>кг</p>
        </div>
      </div>
      <div className="subcard">
        {product.state === 'selected' || product.state === 'selected-hovered' ? product.description : 
          product.state === 'disabled' ? `Печалька, ${product.ingredient} закончился.` : 
          <>Чего сидишь? Порадуй котэ, <a href=""  
                                          className="subcard__link" 
                                          onClick={(e) => {
                                            e.preventDefault();
                                            onClick(product);
                                          }}>купи</a>.</>}
      </div>
    </li>
  );
}

export default App;
