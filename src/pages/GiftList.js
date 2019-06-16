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

class GiftList extends Component {
  constructor(props) {
    super(props);

    this.API = API();

    this.state = {
      pageOfItems: [],
      defaultProducts: [],
      filteredProducts: [],
      showSpinner: false,
      sum: null,
      selectedPrice: { value: 0, label: 'All' },
      priceOptions: [
        { value: 0, label: 'All' },
        { value: 10, label: 'To R$10' },
        { value: 25, label: 'To R$25' },
        { value: 50, label: ' To R$50' },
        { value: 100, label: 'To R$100' },
      ],
      nameFilter: '',
    };

    this.onChangePage = this.onChangePage.bind(this);

    /**
     * Callback function to when user selects some value on Price.
     * Saves price to this component state.
     * @param {Object} selectedPrice
     */
    this.handleChangeOnPrice = selectedPrice => {
      const { defaultProducts } = this.state;
      this.setState({
        selectedPrice: selectedPrice,
      });

      if (selectedPrice.value === 0)
        return this.setState({ filteredProducts: defaultProducts });

      const newProducts = defaultProducts.filter(x => {
        return x.price >= 0 && x.price <= selectedPrice.value;
      });
      this.setState({ filteredProducts: newProducts, showSpinner: false });
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
      this.setState({ showSpinner: true });
      const endpoint = '/1d8q55';
      this.API.get(endpoint).then(response => {
        this.setState({
          defaultProducts: response.data,
          filteredProducts: response.data,
          sum: response.data.reduce((a, b) => a + (b['price'] || 0), 0),
          showSpinner: false,
        });
      });
    };
  }
  async componentDidMount() {
    this.fetchProducts();
  }

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }

  render() {
    const {
      showSpinner,
      filteredProducts,
      sum,
      priceOptions,
      selectedPrice,
      nameFilter,
    } = this.state;
    return (
      <Container fluid className="container-limited">
        <div className="box mt-5">
          {showSpinner && (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          )}
          {!showSpinner &&
            sum && [
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
                      value={sum}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'R$'}
                      decimalSeparator={','}
                      thousandSeparator={'.'}
                      decimalScale={2}
                    />
                  </CardText>
                </CardBody>
              </Card>,
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
              </div>,
              <div>
                <div className="row">
                  {this.state.pageOfItems.map(item => (
                    <div className="col-sm-6 col-lg-3 py-2">
                      <div className="card h-100">
                        <img
                          className="card-img-top img-fluid"
                          src={item.image}
                          alt="Card image cap"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <p className="card-text">1 Unit</p>
                          <p class="card-text">
                            <CurrencyFormat
                              value={item.price}
                              displayType={'text'}
                              thousandSeparator={true}
                              prefix={'R$'}
                              decimalSeparator={','}
                              thousandSeparator={'.'}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <CardDeck>
                {this.state.pageOfItems.map(item => (
                <Card key={item.id}>
                <CardImg top width="100%" src={item.image} alt="Card image cap" />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                    <Button>Button</Button>
                </CardBody>
                </Card>
              ))}
            </CardDeck> */}
                <Pagination
                  items={filteredProducts}
                  onChangePage={this.onChangePage}
                />
              </div>,
            ]}
        </div>
      </Container>
    );
  }
}

export default GiftList;
