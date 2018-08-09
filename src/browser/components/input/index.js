import React from 'react';

export default (props) => {
    return (
        <div className='form-group'>
            <input
                type={props.type}
                className='form-control form-control-lg'
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
                name={props.name} />
        </div>
    )
}
