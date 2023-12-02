import React, { useState } from "react";
import { FiEdit, FiSave, FiTrash } from "react-icons/fi";

const TableRow = ({
  user,
  selectedRows,
  handleRowSelect,
  handleDeleteRow,
  shouldShowEditModal,
  setShouldShowEditModal,
  handleUpdateRowModal,
}) => {
  const { id, name, email, role } = user;
  const [updatedUser, setUpdatedUser] = useState({ id, name, email, role });
  const [errors, setErrors] = useState({});

  const validateName = (name) => name.trim() === '' ? 'Name cannot be empty' : '';
  const validateEmail = (email) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Invalid email format' : '';
  const validateRole = (role) => !['member', 'admin'].includes(role) ? 'Role must be either member or admin' : '';

  const handleInputChange = (field, value) => {
    setUpdatedUser({ ...updatedUser, [field]: value });
    let errorMessage = '';
    if (field === 'name') errorMessage = validateName(value);
    if (field === 'email') errorMessage = validateEmail(value);
    if (field === 'role') errorMessage = validateRole(value);
    setErrors({ ...errors, [field]: errorMessage });
  };

  const handleSave = () => {
    const nameError = validateName(updatedUser.name);
    const emailError = validateEmail(updatedUser.email);
    const roleError = validateRole(updatedUser.role);
    if (!nameError && !emailError && !roleError) {
      handleUpdateRowModal(updatedUser);
    } else {
      setErrors({ name: nameError, email: emailError, role: roleError });
    }
  };

  return (
    <tr role="row" className={`tablerow ${selectedRows?.includes(user) ? "selected" : ""}`}>
      <td>
        <input
          type="checkbox"
          checked={selectedRows?.includes(user)}
          onChange={() => handleRowSelect(user)}
        />
      </td>
      {shouldShowEditModal?.isModalOpen && shouldShowEditModal?.user.id === id ? (
        <>
          <td>
            <input
              type="text"
              value={updatedUser.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </td>
          <td>
            <input
              type="text"
              value={updatedUser.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </td>
          <td>
            <input
              type="text"
              value={updatedUser.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
            />
            {errors.role && <div className="error-message">{errors.role}</div>}
          </td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{email}</td>
          <td>{role}</td>
        </>
      )}
      <td>
        <div className="tablerow-action-btns">
          {shouldShowEditModal?.isModalOpen && shouldShowEditModal?.user.id === id ? (
            <span className="tablerow-btn edit" onClick={handleSave} role="button">
              <FiSave className="icon icon-save" />
            </span>
          ) : (
            <span
              className="tablerow-btn btn-edit"
              onClick={() => setShouldShowEditModal({ isModalOpen: true, user })}
              role="button"
            >
              <FiEdit className="icon icon-edit" />
            </span>
          )}
          <span
            className="tablerow-btn btn-delete"
            onClick={() => handleDeleteRow(user)}
            role="button"
          >
            <FiTrash className="icon icon-delete" />
          </span>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
