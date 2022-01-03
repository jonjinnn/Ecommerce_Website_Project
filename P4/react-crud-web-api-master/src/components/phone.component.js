import React, { Component } from "react";
import PhoneDataService from "../services/phone.service";
import "./phones-list.component.css"

export default class Phone extends Component {
  constructor(props) {
    super(props);
    this.onChangeModel = this.onChangeModel.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeMemory = this.onChangeMemory.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeImageUrl = this.onChangeImageUrl.bind(this);
    this.onChangeNumUnits = this.onChangeNumUnits.bind(this);
    this.getPhone = this.getPhone.bind(this);
    //this.updatePublished = this.updatePublished.bind(this);
    //this.updatePhone = this.updatePhone.bind(this);
    this.deletePhone = this.deletePhone.bind(this);
    this.handleValidation = this.handleValidation.bind(this);

    this.state = {
      currentPhone: {
        id: null,
        model: "",
        color: "",
        memory: "",
        price: null,
        description: "",
        category: "",
        image_url: "",
        numUnits: null,
        //published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPhone(this.props.match.params.id);
  }

  onChangeModel(e) {
    const model = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPhone: {
          ...prevState.currentPhone,
          model: model
        }
      };
    });
  }

  onChangeColor(e) {
    const color = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPhone: {
          ...prevState.currentPhone,
          color: color
        }
      };
    });
  }

  onChangeMemory(e) {
    const memory = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPhone: {
          ...prevState.currentPhone,
          memory: memory
        }
      };
    });
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPhone: {
          ...prevState.currentPhone,
          price: price
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState(prevState => ({
      currentPhone: {
        ...prevState.currentPhone,
        description: description
      }
    }));
  }

  onChangeCategory(e) {
    const category = e.target.value;

    this.setState(prevState => ({
      currentPhone: {
        ...prevState.currentPhone,
        category: category
      }
    }));
  }

  onChangeImageUrl(e) {
    const image_url = e.target.value;

    this.setState(prevState => ({
      currentPhone: {
        ...prevState.currentPhone,
        image_url: image_url
      }
    }));
  }

  onChangeNumUnits(e) {
    const numUnits = e.target.value;

    this.setState(prevState => ({
      currentPhone: {
        ...prevState.currentPhone,
        numUnits: numUnits
      }
    }));
  }

  getPhone(id) {
    PhoneDataService.get(id)
      .then(response => {
        this.setState({
          currentPhone: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  /*
  updatePublished(status) {
    var data = {
      id: this.state.currentPhone.id,
      title: this.state.currentPhone.title,
      description: this.state.currentPhone.description,
      published: status
    };

    PhoneDataService.update(this.state.currentPhone.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentPhone: {
            ...prevState.currentPhone,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
*/

  /*
  updatePhone() {
    PhoneDataService.update(
      this.state.currentPhone.id,
      this.state.currentPhone
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The phone was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  */

  handleValidation () {
    const { currentPhone } = this.state;
    // only each block with generate error
    if (!currentPhone.model) {
      this.setState({ error: 'Model can not be empty!' });
    } else if (!currentPhone.color) {
      this.setState({ error: 'Color can not be empty!' });
    } else if (!currentPhone.memory || isNaN(currentPhone.memory)) {
      this.setState({ error: 'Memory is not valid!' });
    }else if (!currentPhone.price || isNaN(currentPhone.price)) {
      this.setState({ error: 'Price is not valid!' });
    } else if (!currentPhone.description) {
      this.setState({ error: 'Description can not be empty!' });
    }else if (!currentPhone.category) {
      this.setState({ error: 'Category can not be empty!' });
    }else if (!currentPhone.image_url) {
      this.setState({ error: 'Image url can not be empty!' });
    }else if (!currentPhone.numUnits || isNaN(currentPhone.numUnits)) {
      this.setState({ error: 'Number of units is not valid!' });
    } else {
      this.setState({error: ""})

      PhoneDataService.update(
          this.state.currentPhone.id,
          this.state.currentPhone
      )
          .then(response => {
            console.log(response.data);
            this.setState({
              message: "The phone was updated successfully!"
            });
          })
          .catch(e => {
            console.log(e);
          });
    }
  }

  deletePhone() {
    PhoneDataService.delete(this.state.currentPhone.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/phones')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPhone } = this.state;

    return (
      <div>
        {currentPhone ? (
          <div id="border-box" className="edit-form">
            <h4>Phone</h4>
            <form>
              <div className="form-group">
                <label htmlFor="model">Model</label>
                <input
                  type="text"
                  className="form-control"
                  id="model"
                  value={currentPhone.model}
                  onChange={this.onChangeModel}
                />
              </div>

              <div className="form-group">
                <label htmlFor="color">Color</label>
                <input
                    type="text"
                    className="form-control"
                    id="color"
                    value={currentPhone.color}
                    onChange={this.onChangeColor}
                />
              </div>

              <div className="form-group">
                <label htmlFor="memory">Memory</label>
                <input
                    type="text"
                    className="form-control"
                    id="memory"
                    value={currentPhone.memory}
                    onChange={this.onChangeMemory}
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                    type="text"
                    className="form-control"
                    id="price"
                    value={currentPhone.price}
                    onChange={this.onChangePrice}
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPhone.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                    type="text"
                    className="form-control"
                    id="category"
                    value={currentPhone.category}
                    onChange={this.onChangeCategory}
                />
              </div>

              <div className="form-group">
                <label htmlFor="image_url">Image Url</label>
                <input
                    type="text"
                    className="form-control"
                    id="image_url"
                    value={currentPhone.image_url}
                    onChange={this.onChangeImageUrl}
                />
              </div>

              <div className="form-group">
                <label htmlFor="numUnits">Number of units available</label>
                <input
                    type="text"
                    className="form-control"
                    id="numUnits"
                    value={currentPhone.numUnits}
                    onChange={this.onChangeNumUnits}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePhone}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.handleValidation}
            >
              Update
            </button>
            <br></br>
            {(this.state.error !== '')
                ? <span style={{color: "red"}}>{this.state.error}</span>
                : ''
            }
            <p style={{color: "red"}}>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Phone...</p>
          </div>
        )}
      </div>
    );
  }
}
