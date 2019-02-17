import React, { Component } from 'react';
import QrReader from "react-qr-reader";
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        minigame: state.minigame,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotQRData: (data) => dispatch({type: 'GOT_QR_DATA', payload: data})
    }
}

class QRScanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
        };

        this.handleScan = this.handleScan.bind(this);
    }

    handleScan(data) {
        if (data) {
            let { scannedObject } = this.props
            this.props.gotQRData(data);
            const tagId = 0;

            let urlSplit = data.split('/')
            if(urlSplit.length) {
                tagId = urlSplit([urlSplit.length - 1])
                scannedObject(tagId)
            } else {
            // TODO invalid data
            return
            }
        }
        return
    }

    handleError(err) {
        console.error(err);
    }

    render() {
        // Need to send this prop
        let { scannedObject, hide } = this.props

        let displayType = 'inherit'
        if(hide===true) {
            displayType = 'none'
        }

        return (
            <QrReader
                delay={this.state.delay}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: "100%", display: displayType }}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRScanner);
