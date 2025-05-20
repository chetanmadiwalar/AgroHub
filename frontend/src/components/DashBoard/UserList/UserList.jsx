import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import Message from '../../../components/Message/Message';
import Loader from '../../../components/Loader/Loader';
import { listUsers, deleteUsers } from '../../../actions/userActions';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

// Styled Components
const PageContainer = styled.div`
  animation: ${fadeIn} 0.6s ease-out;
  padding: 2rem;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const AddAdminButton = styled(Button)`
  float: right;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 25px;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.15);
  }
`;

const StyledTable = styled(Table)`
  margin-bottom: 2rem;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
`;

const TableHeader = styled.thead`
  background: linear-gradient(135deg, #f5f7fa 0%, #e4efe9 100%);
  
  th {
    color: #2c3e50;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    border: none;
    text-align: center;
  }
`;

const TableRow = styled.tr`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  animation: ${slideIn} 0.5s ease-out forwards;
  opacity: 0;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  td {
    vertical-align: middle;
    border: none;
    border-bottom: 1px solid #f1f1f1;
    padding: 1rem;
  }
`;

const ActionButton = styled(Button)`
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 0.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const EditButton = styled(ActionButton)`
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
`;

const DeleteButton = styled(ActionButton)`
  background: linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%);
  border: none;
`;

const EmailLink = styled.a`
  color: #4b6cb7;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #182848;
    text-decoration: underline;
  }
`;

const NoAddress = styled.span`
  color: #ff4757;
  font-weight: 500;
`;

const CheckIcon = styled.i.attrs({ className: 'fas fa-check' })`
  color: #2ecc71;
`;

const TimesIcon = styled.i.attrs({ className: 'fas fa-times' })`
  color: #e74c3c;
`;

const UserList = ({ history }) => {
    const dispatch = useDispatch();
    const [fadeIn, setFadeIn] = useState(false);

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
            setFadeIn(true);
        } else {
            history.push('/login');
        }
    }, [dispatch, history, successDelete, userInfo]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUsers(id));
        }
    };

    return (
        <PageContainer>
            <LinkContainer to='/register'>
                <AddAdminButton>
                    <i className="fas fa-user-plus mr-2"></i> ADD ADMIN
                </AddAdminButton>
            </LinkContainer>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <StyledTable hover responsive>
                    <TableHeader>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>ADDRESS</th>
                            <th>EMAIL / NIC</th>
                            <th>ADMIN</th>
                            <th>ACTIONS</th>
                        </tr>
                    </TableHeader>
                    <tbody>
                        {users.map((user, index) => (
                            <TableRow 
                                key={user._id}
                                style={{ animationDelay: `${index * 0.1}s`, textAlign: 'center' }}
                            >
                                <td style={{ fontWeight: '500' }}>{user._id.substring(0, 6)}...</td>
                                <td style={{ fontWeight: '600' }}>{user.name}</td>
                                <td>
                                    {user.address ? (
                                        user.address
                                    ) : (
                                        <NoAddress>Address not provided</NoAddress>
                                    )}
                                </td>
                                <td>
                                    <EmailLink href={`mailto:${user.email}`}>
                                        {user.email}
                                    </EmailLink>
                                </td>
                                <td>
                                    {user.isAdmin ? (
                                        <CheckIcon />
                                    ) : (
                                        <TimesIcon />
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <EditButton>
                                            <i className="fas fa-edit"></i>
                                        </EditButton>
                                    </LinkContainer>
                                    <DeleteButton onClick={() => deleteHandler(user._id)}>
                                        <i className="fas fa-trash-alt"></i>
                                    </DeleteButton>
                                </td>
                            </TableRow>
                        ))}
                    </tbody>
                </StyledTable>
            )}
        </PageContainer>
    );
};

export default UserList;