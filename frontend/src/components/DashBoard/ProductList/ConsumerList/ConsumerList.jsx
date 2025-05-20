import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyledContainer,
  PageHeader,
  CreateButton,
  StyledTable,
  EditButton,
  DeleteButton,
  ResponsiveRow,
  HeaderCol,
  ButtonCol
} from '../adminStyles';
import Message from './../../../../components/Message/Message';
import Loader from './../../../../components/Loader/Loader';
import { listConsumerProducts, deleteConsumerProduct, createConsumer } from './../../../../actions/consumerProductAction';
import { CONSUMER_CREATE_RESET } from './../../../../constants/productConstants';

const ConsumerList = () => {
    const dispatch = useDispatch();
    let history = useHistory();

    const consumerProductList = useSelector(state => state.consumerProductList);
    const { loading: loadingConsumer, error: errorConsumer, consumerProducts } = consumerProductList;

    const consumerProductDelete = useSelector(state => state.consumerProductDelete);
    const { loading: deleteLoadingConsumer, error: errorDeleteConsumer, success: successDelete } = consumerProductDelete;

    const consumerCreate = useSelector(state => state.consumerCreate);
    const {
        loading: createLoadingConsumer,
        error: errorcreateConsumer,
        success: successCreate,
        product: consumerProduct
    } = consumerCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: CONSUMER_CREATE_RESET });
        if (!userInfo?.isAdmin) {
            history.push('/login');
        } else {
            if (successCreate) {
                history.push(`/admin/productlist/consumer/${consumerProduct._id}/edit`);
            } else {
                dispatch(listConsumerProducts());
            }
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, consumerProduct]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this consumer product?')) {
            dispatch(deleteConsumerProduct(id));
        }
    };

    const createConsumerProductHandler = () => {
        dispatch(createConsumer());
    };

    return (
        <StyledContainer fluid>
            <ResponsiveRow className="align-items-center mb-4">
                <HeaderCol md={6}>
                    <PageHeader>Consumer Products</PageHeader>
                </HeaderCol>
                <ButtonCol md={6}>
                    <CreateButton onClick={createConsumerProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </CreateButton>
                </ButtonCol>
            </ResponsiveRow>
            
            {createLoadingConsumer && <Loader />}
            {errorcreateConsumer && <Message variant='danger'>{errorcreateConsumer}</Message>}
            {deleteLoadingConsumer && <Loader />}
            {errorDeleteConsumer && <Message variant='danger'>{errorDeleteConsumer}</Message>}
            
            {loadingConsumer ? (
                <Loader />
            ) : errorConsumer ? (
                <Message variant='danger'>{errorConsumer}</Message>
            ) : (
                <div className="table-responsive">
                    <StyledTable striped hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>SELLER NAME</th>
                                <th>PRODUCT NAME</th>
                                <th>AVAILABLE LOCATION</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consumerProducts.map(consumer => (
                                <tr key={consumer._id}>
                                    <td className="text-truncate" style={{maxWidth: '150px'}}>{consumer._id}</td>
                                    <td>{consumer.seller_name}</td>
                                    <td>{consumer.prod_name}</td>
                                    <td>{consumer.avalaible_location}</td>
                                    <td>
                                        <LinkContainer to={`/admin/productlist/consumer/${consumer._id}/edit`}>
                                            <EditButton variant="primary" title="Edit">
                                                <i className="fas fa-edit"></i>
                                            </EditButton>
                                        </LinkContainer>
                                        <DeleteButton
                                            variant="danger"
                                            onClick={() => deleteHandler(consumer._id)}
                                            title="Delete"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </DeleteButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </StyledTable>
                </div>
            )}
        </StyledContainer>
    );
};

export default ConsumerList;