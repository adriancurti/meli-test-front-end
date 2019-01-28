import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import classes from './ProductDetail.module.css';
import Notification, { toastOptions } from '../../components/UI/Notification/Notification';
import SearchBox from '../SearchBox/SearchBox';
import imageFreeShipping from '../../assets/images/ic_shipping@2x.png.png';

import * as actions from '../../store/actions/index';

class ProductDetail extends Component {

    componentDidMount() {
        this.getProductDetail();
    }

    componentDidUpdate() {
        if (this.props.error) {
            this.props.onProductsResetError();
        }
    }

    getProductDetail = () => {
        this.props.onProductsResetSelected();
        const path = this.props.location.pathname;
        const index = path.split('/').length - 1;
        let id = path.split('/')[index];
        this.props.onProductsGet(id, this.props.currencies, this.props.serverURL);
    }

    searchChangedHandler = search => {
        if (!search) {
            this.props.history.push({ pathname: '/' });
        } else {
            this.props.history.push({ pathname: '/items', search: `?search=${search}` });
        }
    }

    buttonBuyClickedHandler = title => {
        let message = `Ha comprado el producto ${title}.`;
        toast.dismiss();
        toast.success(<Notification toastType="success" title="¡Felicitaciones!" message={message} />, toastOptions);
    }

    render() {
        let categories = null;
        if (this.props.data) {
            categories = this.props.data.categories.map((item, index) => {
                if (index < this.props.data.categories.length - 1) {
                    return (
                        <Fragment key={index + ',' + item}>
                            <span className={classes.PathFromRoot}>{this.props.data.categories[index]}</span>
                            <FontAwesomeIcon className={classes.Separator} icon={faChevronRight} />
                        </Fragment>
                    );
                } else {
                    return (
                        <Fragment key={index + ',' + item}>
                            <span className={classes.EndOfPathFromRoot}>{this.props.data.categories[index]}</span>
                        </Fragment>
                    );
                }
            });
        }

        let product = <article className={classes.Article}></article>;
        if (this.props.selected) {
            const selected = this.props.selected.item;
            let decimals = selected.price.decimals;
            product =
                <article className={classes.Article}>
                    <div className={classes.PictureContainer}>
                        <img className={classes.Picture} src={selected.picture} alt="Producto" draggable="false" />
                        <div className={classes.DescriptionLabel}>Descripción del producto</div>
                        <div className={classes.DescriptionText}>{selected.description}</div>
                    </div>
                    <div className={classes.BuyContainer}>
                        <div className={classes.ConditionAndSoldQuantity}>{selected.condition === 'new' ? 'Nuevo' : 'Usado'}{` - ${selected.sold_quantity} vendidos`}</div>
                        <div className={classes.Title}>{selected.title}</div>
                        <div className={classes.PriceContainer}>
                            <div className={classes.Currency}>{selected.price.currency}</div>
                            <div className={classes.Amount}>{selected.price.amount.toLocaleString()}</div>
                            <div className={classes.Decimals}>{decimals >= 10 ? decimals : decimals + '0'}</div>
                            {selected.free_shipping ?
                                <img className={classes.FreeShipping} src={imageFreeShipping} alt="Envío Gratis" draggable="false" /> : null}
                        </div>
                        <div className={classes.ButtonBuy} onClick={() => this.buttonBuyClickedHandler(selected.title)}>
                            Comprar
                    </div>
                    </div>
                </article>;
        }

        if (this.props.error) {
            toast.dismiss();
            toast.error(<Notification toastType="error" title="Error" message={this.props.error.message} />, toastOptions);
        }

        return (
            <Fragment>
                <SearchBox
                    search={''}
                    changed={this.searchChangedHandler} />
                <div className={classes.ProductDetail}>
                    <div className={classes.Categories}>
                        {categories}
                    </div>
                    <div className={classes.Selected}>
                        {product}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        serverURL: state.env.serverURL,
        data: state.products.data,
        selected: state.products.selected,
        error: state.products.error,
        loading: state.products.loading,
        currencies: state.currencies.data
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onProductsResetSelected: () => dispatch(actions.productsResetSelected()),
        onProductsGet: (id, currencies, serverURL) => dispatch(actions.productsGet(id, currencies, serverURL)),
        onProductsResetError: () => dispatch(actions.productsResetError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);