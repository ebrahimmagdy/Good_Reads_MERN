import React , {Component} from 'react';
import {Col,Nav,NavItem,NavLink,Row,TabContent,TabPane} from "reactstrap";
import classnames from 'classnames';
import AddCategoryForm from "./addCategory";
import AddBookForm from "./addBook";
import AddAuthorForm from "./addAuthor";
import Cookies from 'universal-cookie';
import '../assets/css/adminDashboard.css';

class AdminControl extends Component {
    constructor(props) {
        super(props);
        this.state={
            activeTab: '1',
            modalIsOpen: false,
        };
        this.handle_modal = this.handle_modal.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }
    
    componentDidMount(){
         let cookies = new Cookies();
         if (!cookies.get('token')) {
             window.location = "http://localhost:3000/admin";
         }
    }

    handle_modal() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
 render() {
        return (
            <>
            <div className='container-fluid adminMainContainer'>
                <div className="row">
                    <div className="col-lg-12">
                    <Nav tabs>
                        <NavItem className="cc">
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => {this.toggle('1');}}
                            >
                                Categories
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                            >
                                Books
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}
                            >
                                Authors
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="8">
                                    <AddCategoryForm cancel="cancel"title="Add Category"/>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    
                                    <AddBookForm cancel="cancel" title="Add Book"/>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                                <Col sm="12">
                                    <AddAuthorForm first="First name" second="Second name" cancel="cancel" title="Add Author"/>
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className="modal fade bd-example-modal-sm" tabIndex="-1" role="dialog"
                                 aria-labelledby="mySmallModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-sm">
                                    <div className="modal-content">
                                        ...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                </>
        );
    }
}
export default AdminControl;