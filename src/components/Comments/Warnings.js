import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Warnings extends React.PureComponent {
    constructor(props) {
        super(props);
        this.handleCloseWarning = this.handleCloseWarning.bind(this);
        this.state={
            hidden: true,
        }
    }

    handleCloseWarning() {
        this.props.handleCloseWarning();
    }

    render() {
        const {warning} = this.props;
        return(
            <div className={classNames("alert", {
                'warning': warning !== 'OK',
                'info': warning === 'OK'
            })}>
                <span className="closebtn" onClick={() => this.handleCloseWarning()}>×</span>
                <strong>
                    {
                        warning === 'OK' ? '评论成功' : warning
                    }
                </strong>
            </div>
        )
    }
}

Warnings.propTypes = {
    warning: PropTypes.string.isRequired,
    handleCloseWarning: PropTypes.func.isRequired,
}

export default Warnings;