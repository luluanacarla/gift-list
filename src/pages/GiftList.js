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
import Pagination from '../components/Pagination/Pagination';
import CurrencyFormat from 'react-currency-format';

class GiftList extends Component {
  constructor(props) {
    super(props);

    this.API = API();

    this.state = {
      pageOfItems: [],
      products: [],
      showSpinner: false,
      sum: null,
    };

    this.onChangePage = this.onChangePage.bind(this);

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

  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
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
          {!showSpinner &&
            sum && [
              <Card>
                <div className="card-head"></div>
                <div className="circle"></div>
                <CardBody>
                  <CardTitle className="text-center">
                    <h3>O Bêbe Nerd</h3>
                  </CardTitle>
                  <CardText className="text-center">
                    {products.length} items with a total of{' '}
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
              <div>
                <div class="row">
                  {this.state.pageOfItems.map(item => (
                    <div class="col-sm-6 col-lg-3 py-2">
                      <div class="card h-100">
                        <img
                          class="card-img-top img-fluid"
                          src={item.image}
                          alt="Card image cap"
                        />
                        <div class="card-body">
                          <h4 class="card-title">{item.name}</h4>
                          <p class="card-text">1 Unit</p>
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
                <Pagination items={products} onChangePage={this.onChangePage} />
              </div>,
            ]}
        </div>
      </Container>
    );
  }
}

export default GiftList;
