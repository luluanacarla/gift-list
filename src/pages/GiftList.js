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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
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
      showSpinner: false,
      params: {
        selectedPrice: { value: { min: 0, max: 0 }, label: 'All' },
        selectedOrder: { value: 'name asc', label: 'Name asc' },
        nameFilter: '',
      },
      priceOptions: [
        { value: { min: 0, max: 0 }, label: 'All' },
        { value: { min: 0, max: 25 }, label: 'Under R$25' },
        { value: { min: 25, max: 50 }, label: 'R$25 to R$50' },
        { value: { min: 50, max: 100 }, label: 'R$50 to R$100' },
        { value: { min: 100, max: 200 }, label: 'R$100 to R$200' },
      ],
      orderOptions: [
        { value: 'name asc', label: 'Name asc' },
        { value: 'name desc', label: 'Name desc' },
        { value: 'price asc', label: 'Price asc' },
        { value: 'price desc', label: 'Price Desc' },
      ],
      removedItems: [],
      modal: false,
      currentId: null,
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.toggle = this.toggle.bind(this);

    /**
     * Callback function to when user selects some value on Order.
     * Saves order to this component state.
     * @param {Object} selectedOrder
     */
    this.handleChangeOnOrder = selectedOrder => {
      this.setState(prevState => ({
        params: { ...prevState.params, selectedOrder },
      }));
    };

    /**
     * Callback function to when user selects some value on Price.
     * Saves price to this component state.
     * @param {Object} selectedPrice
     */
    this.handleChangeOnPrice = selectedPrice => {
      this.setState(prevState => ({
        params: { ...prevState.params, selectedPrice },
      }));
    };

    /**
     * Callback for when user input some data on form fields.
     * It saves the data in their component state.
     * @param event
     */
    this.handleInputChange = event => {
      const { target } = event;
      let { value } = target;

      this.setState(prevState => ({
        params: { ...prevState.params, nameFilter: value },
      }));
    };

    this.fetchProducts = () => {
      const { removedItems, params } = this.state;
      this.setState({ showSpinner: true });
      const endpoint = '/1d8q55';
      this.API.get(endpoint).then(response => {
        const defaultProducts = response.data.filter(
          item => removedItems.indexOf(item.id) === -1
        );

        const newProducts = defaultProducts
          .filter(item => {
            return (
              item.name.toLowerCase().indexOf(params.nameFilter.toLowerCase()) >
              -1
            );
          })
          .filter(item => {
            if (params.selectedPrice.value.max !== 0) {
              return (
                item.price >= params.selectedPrice.value.min &&
                item.price <= params.selectedPrice.value.max
              );
            }

            return defaultProducts;
          })
          .sort((a, b) => {
            if (params.selectedOrder.value === 'name desc') {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              }
            }
            if (params.selectedOrder.value === 'price asc')
              return parseFloat(a.price) - parseFloat(b.price);
            if (params.selectedOrder.value === 'price desc')
              return parseFloat(b.price) - parseFloat(a.price);

            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

        var items = [
          { name: 'Edward', value: 21 },
          { name: 'Sharpe', value: 37 },
          { name: 'And', value: 45 },
          { name: 'The', value: -12 },
          { name: 'Magnetic', value: 13 },
          { name: 'Zeros', value: 37 },
        ];

        items.sort(function(a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          // names must be equal
          return 0;
        });

        console.log(items);

        this.setState({
          defaultProducts: newProducts,
          filteredProducts: newProducts,
          showSpinner: false,
        });
      });
    };

    this.handleButtonClick = () => {
      const { removedItems, currentId } = this.state;
      removedItems.push(currentId);
      this.setState({ removedItems: removedItems }, () => {
        localStorage.setItem('removedItems', removedItems);
        this.toggle();
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

  toggle(id) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      currentId: id,
    }));
  }

  render() {
    const {
      showSpinner,
      filteredProducts,
      priceOptions,
      orderOptions,
      params,
    } = this.state;
    return (
      <Container fluid className="container-limited">
        <div className="box mt-5">
          <Card>
            <div className="card-head"></div>
            <div className="circle"></div>
            <CardBody className="card-body-top">
              <CardTitle className="text-center">
                <h3 className="blue-font">O Bêbe Nerd</h3>
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
              <CardText className="text-center">
                <Button className="pink-btn"> I WANT THIS LIST!</Button>
              </CardText>
              <CardText className="text-center">
                <small>
                  You can give a unique name and choose a photo of yours.
                </small>
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
                <Col md={3}>
                  <Label>Order</Label>
                  <Select
                    name="form-field-name"
                    value={params.selectedOrder}
                    onChange={this.handleChangeOnOrder}
                    options={orderOptions}
                    placeholder="Order"
                    isClearable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={3}>
                  <Label>Price Range</Label>
                  <Select
                    name="form-field-name"
                    value={params.selectedPrice}
                    onChange={this.handleChangeOnPrice}
                    options={priceOptions}
                    placeholder="Price Range"
                    isClearable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={3}>
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="Name"
                    value={params.nameFilter}
                    onChange={this.handleInputChange}
                  />
                </Col>
                <Col md={3}>
                  <Label>&ensp;</Label>
                  <Button
                    className="d-block"
                    onClick={() => this.fetchProducts()}
                  >
                    Filter
                  </Button>
                </Col>
              </Row>
              <div className="mt-5">
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
                        </div>
                        <div className="card-footer">
                          <Button
                            color="danger"
                            onClick={() => this.toggle(item.id)}
                          >
                            {' '}
                            <FontAwesomeIcon icon="trash-alt" />
                          </Button>
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
              <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
                backdrop={this.state.backdrop}
              >
                <ModalHeader toggle={this.toggle}>Remove Item</ModalHeader>
                <ModalBody>Are you sure you want to remove the item?</ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    onClick={() => {
                      this.handleButtonClick();
                    }}
                  >
                    Yes, remove!
                  </Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default GiftList;
