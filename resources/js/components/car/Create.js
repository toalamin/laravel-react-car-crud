import React from 'react';
import { Card, Button, Badge, Spinner, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import { PUBLIC_URL } from "../../constant";




class Create extends React.Component {

   state = {
    isLoading: false,
    name: "",
    description: "",
    image: "",
    brand_name:"",
    model_name:"",
    errors: {},
    isSuccess: false,
    publicURL:"/reactCrude/",
  };
  
  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

changeValue = (event) => {
	this.setState({
		image:event.target.files[0],
	});
	
}

   submitForm = async (e) => {
    e.preventDefault();
    const { history } = this.props;
    const formData = new FormData()

    formData.append('brand_name', this.state.brand_name)
    formData.append('model_name', this.state.model_name)
    formData.append('name', this.state.name)
    formData.append('description', this.state.description)
    formData.append('image', this.state.image)
   
    await Axios.post(`${PUBLIC_URL}api/carlists`, formData).then(({data})=>{
	     if (data.success) {
	     	console.log("success result");
	      this.setState({
	        name: "",
	        description: "",
	        isLoading: false,
          isSuccess: true,

	      });
	     
	    <Navigate replace to="/" />
	    } else {
	      this.setState({
	        errors: data.errors,
	        isLoading: false,
          isSuccess:false,
	      });
	    }
    }).catch(({response})=>{
      

    })
  }





  render() {


    return (

    	
 <div className="row mt-1">

 <div className='col-3'></div>
	<div className='col-6'>
        <Card>
          <Card.Body>
          <h2> Add New Car </h2>
 {this.state.isSuccess && (
                <p className="text-success">New Car Successfully Added!!</p>
                
              )}




            <Form onSubmit={this.submitForm}>
              <Form.Group controlId="Brand">
                <Form.Label>Brand Name</Form.Label>
                    <Form.Control  as="select" custom name="brand_name"  onChange={(e) => this.changeInput(e)} >
                       <option value="" disabled selected> Select</option>
                      <option value="Tesla">Tesla</option>
                      <option value="BMW">BMW</option>
                      <option value="Ferrari">Ferrari</option>
                      <option value="Toyota">Toyota</option>
                    </Form.Control>
              </Form.Group>

             {this.state.errors && this.state.errors.brand_name && (
                <p className="text-danger">{this.state.errors.brand_name[0]}</p>
              )}
                <Form.Group controlId="Brand">
                <Form.Label>Model Name</Form.Label>
                    <Form.Control  as="select" custom name="model_name"  onChange={(e) => this.changeInput(e)} >
                      <option value="" disabled selected> Select</option>
                      <option value="XUV">XUV</option>
                      <option value="Scorpio">Scorpio</option>
                      <option value="Audi">Audi</option>
                      <option value="Ford">Ford</option>
                    </Form.Control>
                 </Form.Group>

             {this.state.errors && this.state.errors.model_name && (
                <p className="text-danger">{this.state.errors.model_name[0]}</p>
              )}


             <Form.Group controlId="name">
                <Form.Label>Car Name</Form.Label>
                <Form.Control type="text"   placeholder="Enter Car Name" value={this.state.name}
                  name="name"
                  onChange={(e) => this.changeInput(e)} />
              </Form.Group>

             {this.state.errors && this.state.errors.name && (
                <p className="text-danger">{this.state.errors.name[0]}</p>
              )}




              <Form.Group className="mt-1" controlId="description">
                <Form.Label>Car Description</Form.Label>
                <Form.Control  type="text"  placeholder="Enter Car Description"  as="textarea"  rows="5"
                name="description"
                  value={this.state.description}
                  onChange={(e) => this.changeInput(e)}

                 />
              </Form.Group>



              {this.state.errors && this.state.errors.description && (
                <p className="text-danger">
                  {this.state.errors.description[0]}
                </p>
              )}


               <Form.Group controlId="image">
                <Form.Label>Car Image</Form.Label>
                <Form.Control  type="file"  onChange={this.changeValue}/>
              </Form.Group>
              {this.state.errors && this.state.errors.image && (
                <p className="text-danger">
                  {this.state.errors.image[0]}
                </p>
              )}


            

            
               {this.state.isLoading && (
                <Button variant="primary" type="button" disabled>
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>{" "}
                  Saving...
                </Button>
              )}
             

             
                 {!this.state.isLoading && (
		                <Button variant="primary" type="submit">
		                  Save Project
		                </Button>
              )}
             
            </Form>
          </Card.Body>
        </Card>
</div></div>
    	)
  }
}


export default Create;