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
            this.props.gotQRData(data);
<<<<<<< HEAD
            const tagId = 0;

            let urlSplit = data.split('/')
            if(urlSplit.length) {
                tagId = urlSplit([urlSplit.length - 1])
                scannedObject(tagId)
            } else {
            // TODO invalid data
            return
            }
=======
>>>>>>> 44584adfb520cc83f0b678ecfcc7b5bb5dc47067
        }

        return;
    }

    handleError(err) {
        console.error(err);
    }

    render() {
        let { hide } = this.props

        let displayType = 'inherit'
        if(hide === true) {
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
