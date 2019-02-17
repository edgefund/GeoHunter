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
            this.setState({ showQRScanner: false }, async () => await scanTag (
                this.props.user.data.did,
                this.props.user.data.name,
                data
            ));

            setTimeout(() => {
                this.setState({ showQRScanner: true })
            }, 3000);
>>>>>>> fdcde9d4fa9020f57f1d96b27c906463ec090636
        }

        return;
    }

    handleError(err) {
        console.error(err);
    }

    render() {
        return (
            <div>
                { this.state.showQRScanner ?
                    <div>
                        <p>Go to Level { this.props.user.nextTag }</p>
                        <QrReader
                            delay={this.state.delay}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ width: "100%" }}
                        />
                    </div> : <p>Successfully scanned!</p> }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QRScanner);
