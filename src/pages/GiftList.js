import React, { Component } from 'react';
import {
  Container,
  Spinner,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';
import API from '../components/API/API';

class GiftList extends Component {
  constructor(props) {
    super(props);

    this.API = API();

    this.state = {
      products: [],
      showSpinner: false,
      sum: null,
    };

    this.formatPrice = price => {
      console.log(price);
      return `R$${price.toFixed(2)}`;
    };

    this.fetchProducts = () => {
      this.setState({ showSpinner: true });
      const endpoint = '/1d8q55';
      this.API.get(endpoint).then(response => {
        this.setState({
          products: response.data,
          sum: response.data.reduce((a, b) => a + (b['price'] || 0), 0),
          showSpinner: false,
        });
      });
    };
  }
  async componentDidMount() {
    this.fetchProducts();
  }

  render() {
    const { showSpinner, products, sum } = this.state;
    return (
      <Container fluid className="container-limited">
        <div className="box mt-5">
          {showSpinner && (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          )}
          {!showSpinner && sum && (
            <Card>
              <div className="card-head"></div>
              <div className="circle"></div>
              <CardBody>
                <CardTitle className="text-center">
                  <h3>O Bêbe Nerd</h3>
                </CardTitle>
                <CardText className="text-center">
                  {products.length} items with a total of{' '}
                  {this.formatPrice(sum)}
                </CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardBody>
            </Card>
          )}
        </div>
      </Container>
    );
  }
}

export default GiftList;
