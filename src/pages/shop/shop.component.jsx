import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.actions";

import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";

class ShopPage extends React.Component {

  // the shop page component will mount when we either access the shop
  // or we go in to one of the specific categories such as sneakers
  // it will trigger the componentDidMount lifecycle method and fetch
  // the shop data from the firestore, filling up the collections in our
  // shop reducer, that's why we will have a slight loading time as we are
  // handling an async call
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;
    fetchCollectionsStartAsync();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:categoryId`}
          component={CollectionPageContainer}
        />
      </div>
    );
  }
}

// remember that mapDispatchToProps maps the functions that we want to our props
// so we are receiving functions in the props that will be dispatched
// to the connected store
// so our fetchCollectionsStartAsync is a function, mapped to our props
const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);
