import React, { Component } from 'react';
import { Container, Spinner } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import API from '../../components/API/API';

class GiftList extends Component {
  constructor(props) {
    super(props);

    this.API = new API();

    this.state = {
      products: [],
      showSpinner: false,
    };

    this.fetchProducts = () => {
      this.setState({ showSpinner: true });
      const endpoint = '/1d8q55';
      this.API.get(endpoint).then(response => {
        this.setState({
          products: response.data,
          showSpinner: false,
        });
      });
    };
  }
  async componentDidMount() {
    this.fetchProducts();
  }

  render() {
    const { showSpinner } = this.state;
    return (
      <Container fluid className="container-limited">
        <div className9="box mt-5">
          {showSpinner && (
            <div className="text-center">
              <Spinner color="primary" />
            </div>
          )}
        </div>
      </Container>
    );
  }
}

export default GiftList;
