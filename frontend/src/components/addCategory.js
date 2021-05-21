import React , {Component} from 'react';
import {Button, FormGroup, Input, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import {Modal} from "reactstrap"
import Cookies from "universal-cookie";
import swal from 'sweetalert';
import '../assets/css/dashboard.css';
import '../assets/css/adminDashboard.css';


function GetCategories() {
    return fetch('http://localhost:5000/categories/', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ new Cookies().get('token'),
          },
    }).then(response =>
        response.json())
}

function EditCategory(data) {
  return fetch('http://localhost:5000/categories/update/'+data._id, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('Error while editing category');
  })
}

function AddCategory(data) {
  return fetch('http://localhost:5000/categories/', {
    body: JSON.stringify(data),
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('Error while adding adding Category');
  })
}


function DeleteCategory(id) {
  return fetch('http://localhost:5000/categories/'+id, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ new Cookies().get('token'),
    },
  }).then(response =>
      response.json()
  ).catch(error => {
      console.log('data not deleted');
  })
}
/************************************************************************** */
class AddCategoryForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            modalIsOpen: false,
            newCategory: "",
            categories : [],
        };
        this.handle_modal = this.handle_modal.bind(this);
        this.handling_modal = this.handling_modal.bind(this);
    }

    /*
    * Controlling opening / closing the modal
    */
    handle_modal() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    /*
    * Handling update category
    */
    handling_modal(event) {
        if(event.target.name === "edit")
            this.handle_updateCategory(event);
        this.setState(prevState => ({EditModal: !prevState.EditModal,}));
    }
    
    handle_updateCategory =(event)=>{
        if(event.target.name === "edit")
           this.setState({ newCategory: JSON.parse(event.target.value),}); 
        else if(event.target.name === "editCategoryName")
            this.setState({ newCategory: {...this.state.newCategory, name: event.target.value},});
        else 
            this.setState({ newCategory: event.target.value,});
    }

    /*
    * Handle adding category
    */
    handle_addCategory =()=>{
        if((/^ *$/.test(this.state.newCategory)) || (/^$/.test(this.state.newCategory))) {
        
        swal({
        title: "Invalid Data !", 
        text : "Please Enter a valid category name !", 
        icon : "error",
        showLoaderOnConfirm: true,
        }).then(function(){console.log("fail to add category!")})
        }
        else {
            AddCategory({
            'name': this.state.newCategory,
            }).then(data => {
                GetCategories()
                .then(data => {
                    this.setState({
                        categories: data,
                        newCategory : "",
            });
            swal({
            title: "~~ Information ~~", 
            text : "Your category was added successfully !", 
            icon : "success",
            showLoaderOnConfirm: true,
            }).then(function(){console.log("added category!")})
                     });
                });
        }

    this.setState(prevState => ({  modal: !prevState.modal }));
    }
 
    handle_EditCategory =()=>{
        EditCategory(this.state.newCategory).then(data => {
            console.log(data);
            GetCategories()
            .then(data => {
                console.log(data);
                this.setState({
                    categories: data,
                    newCategory : "",
                });
            });
        });
    this.setState(prevState => ({EditModal: !prevState.EditModal,}));
    }


    componentDidMount(){
      GetCategories()
      .then(data => { this.setState({categories: data,})
      });
    }

    /*
    * Handling deleting a category
    */
    handle_deleting = (index) =>{
    const categories = [...this.state.categories];
    console.log(categories[index.target.value]._id);
    DeleteCategory(categories[index.target.value]._id).then((data) => {
        console.log("category was deleted");
        swal({
            title: "~~ Information ~~", 
            text : "Your category was deleted successfully !", 
            icon : "success",
            showLoaderOnConfirm: true,
            }).then(function(){console.log("deleted category!")})       
    });
    categories.splice(index.target.value,1);
    this.setState({categories});
    }

    render() {

        return (
            <div>
                <button onClick={this.handle_modal} className='offset-lg-10  offset-md-10  offset-sm-10  offset-xs-10 adding_btn add_category'>
                {this.props.title} </button>

            <Modal isOpen={this.state.modal} toggle={this.handle_modal} 
                   className={this.props.className}>
                <ModalHeader toggle={this.handle_modal}>{this.props.title}</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input type="name" name="name_add" id="name" placeholder="Add New Category"
                               value={this.state.newCategory} 
                               onChange={this.handle_updateCategory} />                   
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" 
                    onClick={this.handle_addCategory}>{this.props.title}</Button>{' '}
                    <Button color="secondary" onClick={this.handle_modal}>{this.props.cancel}</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.EditModal} toggle={this.handling_modal}
                   className={this.props.className}>
                <ModalHeader toggle={this.handling_modal}>Edit Category</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Input value={this.state.newCategory.name} type="name"
                               name="editCategoryName" id="name"
                               onChange={this.handle_updateCategory}
                               placeholder="Edit Category"  />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" 
                    onClick={this.handle_EditCategory} >Edit</Button>{' '}
                    <Button name="cancel" color="secondary"
                            onClick={this.handling_modal}>Cancel</Button>
                </ModalFooter>
            </Modal>
            <Table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Category name</th>
                <th>Actions</th>
            </tr>
            </thead>
            <thead>
            {this.state.categories.map((category , index) =>
                <tr>
                    <th>{index+1}</th>
                    <th key={index}>
                        {category.name}
                    </th>
                    <th>
                        <button value={JSON.stringify(category)} type="button"
                                name="edit"
                                className="btn btn-info"
                                onClick={this.handling_modal}
                                >Edit</button> {" "}

                        <button value={index} onClick={this.handle_deleting.bind(this)}
                            type="button" className="btn btn-danger">Delete</button> 





                                    </th>




                        </tr>)}
                    </thead>
                </Table>
        </div>

        );
    }
}
export default AddCategoryForm;