import React, { Component } from 'react';
import QrReader from "react-qr-reader";
import { connect } from 'react-redux';
import { scanTag } from '../../helpers/geohunter-contract';

const mapStateToProps = (state) => {
    return {
        minigame: state.minigame,
        user: state.user.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        gotQRData: (data) => dispatch({type: 'GOT_QR_DATA', payload: data})
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 300,
            showQrScanner: true
        };

        this.handleScan = this.handleScan.bind(this);
    }

    handleScan(data) {
        if (data) {
            this.props.gotQRData(data);

            this.setState(
                { showQrScanner: false },
                async () => await scanTag(this.props.user.did, this.props.user.name, data)
            );
        }
    }

    handleError(err) {
        console.error(err);
    }

    componentDidMount() {
        console.log(scanTag);
    }

    render() {
        return (
            <div>
                { this.state.showQrScanner ?
                    <QrReader
                        delay={this.state.delay}
                        onError={this.handleError}
                        onScan={this.handleScan}
                        style={{ width: 500 }}
                    /> : this.props.minigame.QRData
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
