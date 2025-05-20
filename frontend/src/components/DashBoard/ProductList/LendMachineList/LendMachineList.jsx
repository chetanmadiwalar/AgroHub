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
import { listLendMachineProducts, deleteLendMachineProduct, createLendMachine } from './../../../../actions/productLendMachinesActions';
import { MACHINE_CREATE_RESET } from './../../../../constants/productConstants';

const LendMachinesList = () => {
    const dispatch = useDispatch();
    let history = useHistory();

    const productLendMachinesList = useSelector(state => state.productLendMachinesList);
    const { loading: loadingMachine, error: errorMachine, productLendMachines } = productLendMachinesList;

    const productLendMachinesDelete = useSelector(state => state.productLendMachinesDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productLendMachinesDelete;

    const LendMachinesCreate = useSelector(state => state.LendMachinesCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: productCreate } = LendMachinesCreate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: MACHINE_CREATE_RESET });
        if (!userInfo?.isAdmin) {
            history.push('/login');
        } else {
            if (successCreate) {
                history.push(`/admin/productlist/machine/${productCreate._id}/edit`);
            } else {
                dispatch(listLendMachineProducts());
            }
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, productCreate]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this machine product?')) {
            dispatch(deleteLendMachineProduct(id));
        }
    };

    const createMachineProductHandler = () => {
        dispatch(createLendMachine());
    };

    return (
        <StyledContainer fluid>
            <ResponsiveRow className="align-items-center mb-4">
                <HeaderCol md={6}>
                    <PageHeader>Lend Machines</PageHeader>
                </HeaderCol>
                <ButtonCol md={6}>
                    <CreateButton onClick={createMachineProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </CreateButton>
                </ButtonCol>
            </ResponsiveRow>
            
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            
            {loadingMachine ? (
                <Loader />
            ) : errorMachine ? (
                <Message variant='danger'>{errorMachine}</Message>
            ) : (
                <div className="table-responsive">
                    <StyledTable striped hover responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>TARGET PLANT</th>
                                <th>MACHINE POWER</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productLendMachines.map(machine => (
                                <tr key={machine._id}>
                                    <td className="text-truncate" style={{maxWidth: '150px'}}>{machine._id}</td>
                                    <td>{machine.name}</td>
                                    <td>{machine.target_plant}</td>
                                    <td>{machine.machine_power}</td>
                                    <td>
                                        <LinkContainer to={`/admin/productlist/machine/${machine._id}/edit`}>
                                            <EditButton variant="primary" title="Edit">
                                                <i className="fas fa-edit"></i>
                                            </EditButton>
                                        </LinkContainer>
                                        <DeleteButton
                                            variant="danger"
                                            onClick={() => deleteHandler(machine._id)}
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

export default LendMachinesList;