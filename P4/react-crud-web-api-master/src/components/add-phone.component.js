import React, { Component } from "react";
import PhoneDataService from "../services/phone.service";
import "./phones-list.component.css"

export default class AddPhone extends Component {
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
    //this.savePhone = this.savePhone.bind(this);
    this.newPhone = this.newPhone.bind(this);
    this.handleValidation = this.handleValidation.bind(this);

    this.state = {
      id: null,
      model: "",
      color: "",
      memory: "",
      price: null,
      description: "",
      category: "",
      image_url: "",
      numUnits: null,
      //published: false,
      submitted: false,
      error: ""
    };
  }

  onChangeModel(e) {
    this.setState({
      model: e.target.value
    });
  }

  onChangeColor(e) {
    this.setState({
      color: e.target.value
    });
  }

  onChangeMemory(e) {
    this.setState({
      memory: e.target.value
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    });
  }

  onChangeImageUrl(e) {
    this.setState({
      image_url: e.target.value
    });
  }

  onChangeNumUnits(e) {
    this.setState({
      numUnits: e.target.value
    });
  }
/*
  savePhone() {
    let data = {
      model: this.state.model,
      color: this.state.color,
      memory: this.state.memory,
      price: this.state.price,
      description: this.state.description,
      category: this.state.category,
      image_url: this.state.image_url,
      numUnits: this.state.numUnits
    };

    PhoneDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          model: response.data.model,
          color: response.data.color,
          memory: response.data.memory,
          price: response.data.price,
          description: response.data.description,
          category: response.data.category,
          image_url: response.data.image_url,
          numUnits: response.data.numUnits,
          //published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
*/
  newPhone() {
    this.setState({
      id: null,
      model: "",
      color: "",
      memory: "",
      price: null,
      description: "",
      category: "",
      image_url: "",
      numUnits: null,

      submitted: false
    });
  }

  handleValidation () {
    const { model, color, memory, price, description, category, image_url, numUnits } = this.state;
    // only each block with generate error
    if (!model) {
      this.setState({ error: 'Model can not be empty!' });
    } else if (!color) {
      this.setState({ error: 'Color can not be empty!' });
    } else if (!memory || isNaN(memory)) {
      this.setState({ error: 'Memory is not valid!' });
    }else if (!price || isNaN(price)) {
      this.setState({ error: 'Price is not valid!' });
    } else if (!description) {
      this.setState({ error: 'Description can not be empty!' });
    }else if (!category) {
      this.setState({ error: 'Category can not be empty!' });
    }else if (!image_url) {
      this.setState({ error: 'Image url can not be empty!' });
    }else if (!numUnits || isNaN(numUnits)) {
      this.setState({ error: 'Number of units is not valid!' });
    } else {
      this.setState({error: ""})

        let data = {
          model: this.state.model,
          color: this.state.color,
          memory: this.state.memory,
          price: this.state.price,
          description: this.state.description,
          category: this.state.category,
          image_url: this.state.image_url,
          numUnits: this.state.numUnits
        };

        PhoneDataService.create(data)
            .then(response => {
              this.setState({
                id: response.data.id,
                model: response.data.model,
                color: response.data.color,
                memory: response.data.memory,
                price: response.data.price,
                description: response.data.description,
                category: response.data.category,
                image_url: response.data.image_url,
                numUnits: response.data.numUnits,
                //published: response.data.published,

                submitted: true
              });
              console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });

    }
  }

  render() {
    return (
      <div id="border-box" className="submit-form">

        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newPhone}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter model"
                id="model"
                required
                value={this.state.model}
                onChange={this.onChangeModel}
                name="model"
              />
            </div>

            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Enter color"
                  id="color"
                  required
                  value={this.state.color}
                  onChange={this.onChangeColor}
                  name="color"
              />
            </div>

            <div className="form-group">
              <label htmlFor="memory">Memory</label>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Enter memory"
                  id="memory"
                  required
                  value={this.state.memory}
                  onChange={this.onChangeMemory}
                  name="memory"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Enter price"
                  id="price"
                  required
                  value={this.state.price}
                  onChange={this.onChangePrice}
                  name="price"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter description"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category"
                  id="category"
                  required
                  value={this.state.category}
                  onChange={this.onChangeCategory}
                  name="category"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image_url">Image Url</label>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Enter image url"
                  id="image_url"
                  required
                  value={this.state.image_url}
                  onChange={this.onChangeImageUrl}
                  name="image_url"
              />
            </div>

            <div className="form-group">
              <label htmlFor="numUnits">Number of units available</label>
              <input
                  type="text"
                  className="form-control"
                  placeholder="Enter number of units"
                  id="numUnits"
                  required
                  value={this.state.numUnits}
                  onChange={this.onChangeNumUnits}
                  name="numUnits"
              />
            </div>
            <button onClick={this.handleValidation} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
        {(this.state.error !== '')
            ? <span style={{color: "red"}}>{this.state.error}</span>
            : ''
        }
      </div>
    );
  }
}
