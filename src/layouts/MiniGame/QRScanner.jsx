import React, { Component } from 'react';
import QrReader from "react-qr-reader";
import { connect } from 'react-redux';
import { scanTag } from '../../provider/geohunterContract';

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
            showQRScanner: true
        };

        this.handleScan = this.handleScan.bind(this);
    }

    handleScan(data) {
        if (data) {
            let { scannedObject } = this.props;
            this.props.gotQRData(data);
            this.setState({ showQRScanner: false }, async () => await scanTag (
                this.props.user.data.did,
                this.props.user.data.name,
                data
            ));

            setTimeout(() => {
                this.setState({ showQRScanner: true })
            }, 3000);
        }

        return;
    }

    handleError = (err) => {
        console.error(err);
    }

    render() {
        return (
            <div>
                { this.state.showQRScanner ?
                    <div>
                        <QrReader
                            delay={this.state.delay}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            // style={{ width: "100%" }}
                        />
                    </div> : <p>Successfully scanned!</p> }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRScanner);
