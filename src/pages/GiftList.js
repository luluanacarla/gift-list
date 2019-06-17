import React, { Component } from 'react';
import {
  Container,
  Spinner,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Label,
  Input,
} from 'reactstrap';
import API from '../components/API/API';
import Pagination from '../components/Pagination/Pagination';
import CurrencyFormat from 'react-currency-format';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class GiftList extends Component {
  constructor(props) {
    super(props);

    this.API = API();

    this.state = {
      pageOfItems: [],
      defaultProducts: [],
      filteredProducts: [],
      products: [],
      showSpinner: false,
      selectedPrice: { value: { min: 0, max: 0 }, label: 'All' },
      priceOptions: [
        { value: { min: 0, max: 0 }, label: 'All' },
        { value: { min: 0, max: 25 }, label: 'Under R$25' },
        { value: { min: 25, max: 50 }, label: 'R$25 to R$50' },
        { value: { min: 50, max: 100 }, label: 'R$50 to R$100' },
        { value: { min: 100, max: 200 }, label: 'R$100 to R$200' },
      ],
      nameFilter: '',
      removedItems: [],
    };

    this.onChangePage = this.onChangePage.bind(this);

    /**
     * Callback function to when user selects some value on Price.
     * Saves price to this component state.
     * @param {Object} selectedPrice
     */
    this.handleChangeOnPrice = selectedPrice => {
      const { products } = this.state;
      this.setState({
        selectedPrice: selectedPrice,
      });

      if (selectedPrice.label === 'All')
        return this.setState({ filteredProducts: products });

      const newProducts = products.filter(item => {
        return (
          item.price >= selectedPrice.value.min &&
          item.price <= selectedPrice.value.max
        );
      });
      this.setState({
        filteredProducts: newProducts,
        defaultProducts: newProducts,
        showSpinner: false,
      });
    };

    /**
     * Callback for when user input some data on form fields.
     * It saves the data in their component state.
     * @param event
     */
    this.handleInputChange = event => {
      const { defaultProducts } = this.state;
      const { target } = event;
      let { value } = target;

      const newProducts = defaultProducts.filter(item => {
        return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
      });
      this.setState({
        filteredProducts: newProducts,
        nameFilter: value,
      });
    };

    this.fetchProducts = () => {
      const { removedItems } = this.state;
      this.setState({ showSpinner: true });
      const endpoint = '/1d8q55';
      this.API.get(endpoint).then(response => {
        const defaultProducts = response.data.filter(
          item => removedItems.indexOf(item.id) === -1
        );

        this.setState({
          products: defaultProducts,
          defaultProducts: defaultProducts,
          filteredProducts: defaultProducts,
          showSpinner: false,
        });
      });
    };

    this.handleButtonClick = id => {
      const { removedItems } = this.state;
      removedItems.push(id);
      this.setState({ removedItems: removedItems }, () => {
        localStorage.setItem('removedItems', removedItems);
        this.fetchProducts();
      });
    };
  }
  async componentDidMount() {
    let removedItems = localStorage.getItem('removedItems')
      ? localStorage.getItem('removedItems').split(',')
      : [];
    removedItems = removedItems.map(item => Number(item));
    this.setState({ removedItems }, () => {
      this.fetchProducts();
    });
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    const {
      showSpinner,
      filteredProducts,
      priceOptions,
      selectedPrice,
      nameFilter,
    } = this.state;
    return (
      <Container fluid className="container-limited">
        <div className="box mt-5">
          <Card>
            <div className="card-head"></div>
            <div className="circle"></div>
            <CardBody className="card-body-top">
              <CardTitle className="text-center">
                <h3>O Bêbe Nerd</h3>
              </CardTitle>
              <CardText className="text-center">
                {filteredProducts.length} items with a total of{' '}
                <CurrencyFormat
                  value={filteredProducts.reduce(
                    (a, b) => a + (b['price'] || 0),
                    0
                  )}
                  displayType={'text'}
                  prefix={'R$'}
                  decimalSeparator={','}
                  thousandSeparator={'.'}
                  decimalScale={2}
                />
              </CardText>
            </CardBody>
          </Card>
          {showSpinner && (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          )}
          {!showSpinner && (
            <div className="box p-4">
              <Row>
                <Col md={4}>
                  <Label>Price Range</Label>
                  <Select
                    name="form-field-name"
                    value={selectedPrice}
                    onChange={this.handleChangeOnPrice}
                    options={priceOptions}
                    placeholder="Price Range"
                    isClearable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="Name"
                    value={nameFilter}
                    onChange={this.handleInputChange}
                  />
                </Col>
              </Row>
              <div>
                <div className="row">
                  {this.state.pageOfItems.map(item => (
                    <div className="col-sm-6 col-lg-3 py-2">
                      <div className="card h-100">
                        <img
                          className="card-img-top img-fluid"
                          src={item.image}
                          alt="Card cap"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">
                            1 Unit -{' '}
                            <CurrencyFormat
                              value={item.price}
                              displayType={'text'}
                              prefix={'R$'}
                              decimalSeparator={','}
                              thousandSeparator={'.'}
                            />
                          </p>
                          <div className="text-center">
                            <button
                              className="btn btn-primary w-100"
                              onClick={() => {
                                this.handleButtonClick(item.id);
                              }}
                            >
                              <FontAwesomeIcon icon="trash-alt" /> Remove Item
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Pagination
                  items={filteredProducts}
                  onChangePage={this.onChangePage}
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default GiftList;
