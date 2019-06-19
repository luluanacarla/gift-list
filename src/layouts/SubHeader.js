import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SubHeader extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
      <div className="app-header blue shadow text-center">
        <Row>
          <Col>
            <button className="btn btn-link text-subheader">
              <FontAwesomeIcon icon={'angle-double-left'} fixedWidth />
              Back
            </button>
          </Col>
          <Col>
            <div className="text-subheader">
              <h4>Step 2</h4>
              <small className="d-block">Description of step 2</small>
            </div>
          </Col>
          <Col>
            <button className="btn btn-link text-subheader">
              Next
              <FontAwesomeIcon icon={'angle-double-right'} fixedWidth />
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SubHeader;
