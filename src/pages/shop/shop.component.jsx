import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchCollectionsStart } from "../../redux/shop/shop.actions";

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
    const { fetchCollectionsStart } = this.props;
    // calling this will first set isFetching to true in the reducer
    // then it will hit the sagas and do all the async call and mapping
    fetchCollectionsStart();
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
// so we are receiving functions in the props that will dispatch a certain 
// object to the connected store, in the context of thunks a function,
// so our fetchCollectionsStart is a function, mapped to our props
const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
