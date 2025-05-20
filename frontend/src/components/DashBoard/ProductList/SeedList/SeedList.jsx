import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useHistory } from "react-router-dom";
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
import { listSeedProducts, deleteSeedProducts, createSeedProducts } from './../../../../actions/productSeedActions';
import { SEED_CREATE_RESET } from './../../../../constants/productConstants';

const SeedList = () => {
    const dispatch = useDispatch();
    let history = useHistory();

    const prodcutSeedList = useSelector(state => state.prodcutSeedList);
    const { loading: loadingSeed, error: errorSeed, productSeeds } = prodcutSeedList;

    const prodcutSeedDelete = useSelector(state => state.prodcutSeedDelete);
    const { success: successSeedDelete, loading: loadingDelete, error: errorDelete } = prodcutSeedDelete;

    const seedCreate = useSelector(state => state.seedCreate);
    const {
        success: successSeedCreate,
        loading: loadingCreate,
        error: errorCreate,
        product: productCreate
    } = seedCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: SEED_CREATE_RESET });
        if (!userInfo?.isAdmin) {
            history.push('/login');
        } else {
            if (successSeedCreate) {
                history.push(`/admin/productlist/seed/${productCreate._id}/edit`);
            } else {
                dispatch(listSeedProducts());
            }
        }
    }, [dispatch, history, userInfo, successSeedDelete, successSeedCreate, productCreate]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this seed product?')) {
            dispatch(deleteSeedProducts(id));
        }
    };

    const createSeedProductHandler = () => {
        dispatch(createSeedProducts());
    };

    return (
        <StyledContainer fluid>
            <ResponsiveRow className="align-items-center mb-4">
                <HeaderCol md={6}>
                    <PageHeader>Seeds And Fertilizers</PageHeader>
                </HeaderCol>
                <ButtonCol md={6}>
                    <CreateButton onClick={createSeedProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </CreateButton>
                </ButtonCol>
            </ResponsiveRow>
            
            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            
            {loadingSeed ? (
                <Loader />
            ) : errorSeed ? (
                <Message variant='danger'>{errorSeed}</Message>
            ) : (
                <div className="table-responsive">
                    <StyledTable striped hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>CATEGORY</th>
                                <th>PRICE</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productSeeds.map(productSeed => (
                                <tr key={productSeed._id}>
                                    <td className="text-truncate" style={{maxWidth: '150px'}}>{productSeed._id}</td>
                                    <td>{productSeed.name}</td>
                                    <td>{productSeed.category}</td>
                                    <td>₹{productSeed.price.toFixed(2)}</td>
                                    <td>
                                        <LinkContainer to={`/admin/productlist/seed/${productSeed._id}/edit`}>
                                            <EditButton variant="primary" title="Edit">
                                                <i className="fas fa-edit"></i>
                                            </EditButton>
                                        </LinkContainer>
                                        <DeleteButton
                                            variant="danger"
                                            onClick={() => deleteHandler(productSeed._id)}
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

export default SeedList;