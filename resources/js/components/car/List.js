import React from 'react';
import { Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Card, Button, Badge, Spinner } from "react-bootstrap";
import Axios from "axios";
import { PUBLIC_URL } from "../../constant";

class List extends React.Component {


state = {
    carList: [],
    isLoading: false,
    publicURL:"/reactCrude/",
  };
  componentDidMount() {
    this.getCarList();
  }

  deleteProject = async (id) => {
    Axios.delete(`${PUBLIC_URL}api/carlists/${id}`).then((res) => {
     if (res.data.success == true) {
      this.getCarList();
    } else {
      alert("Sorry !! Something went wrong !!");
    }
    });
  };


   getCarList = () => {
    this.setState({ isLoading: true });
    Axios.get(`${PUBLIC_URL}api/carlists`).then((res) => {
      const carList = res.data.data;
      this.setState({
        carList,
        isLoading: false,
      });
    });
  };






  render() {
    return (
    	<Container>
        {this.state.isLoading && (
          <div className="text-center mt-5">
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        )}

		     <div className="row mt-1">
		        <div className='col-10'> <h2>  Car List{" "} <Badge variant="primary">{this.state.carList.length}</Badge></h2>
		     </div>
            <div className='col-2'>
                <Link className='btn btn-primary mb-2 float-end' to={`${this.state.publicURL}create`}>
                  Add  New Car
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                                <tr>
                                    <th>Brand Name</th>
                                    <th>Model Name</th>
                                    <th>Car Title </th>
                                    <th>Car Description</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.carList.length > 0 && (
                                        this.state.carList.map((row, key)=>(
                                            <tr key={key}>
                                                <td>{row.brand_name}</td>
                                                <td>{row.model_name}</td>
                                                <td>{row.name}</td>
                                                <td>{row.description}</td>
                                                <td>
                                                  <img width="50px" src={`${PUBLIC_URL}public/storage/product/image/${row.image}`} />
                
                                                </td>
                                                <td>
                                                   
                                                    <Button
                                                        variant="danger"
                                                        className="mr-2"
                                                        onClick={() => this.deleteProject(row.id)}
                                                      >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>



	    </Container>

    	)
  }
}


export default List;