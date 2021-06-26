import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

// remember that mapStateToProps provides the connected
// component these props
// we name it isLoading since that's whats required
// in the withSpinner component
const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})

// when isLoading is false initially, collections overview
// doesn't break as it is just mapping over an empty
// array, when fetching started and isFetching becomes 
// true, that's when the spinner comes in
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;