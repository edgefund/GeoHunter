import React, { Component } from 'react';
import QrReader from "react-qr-reader";
import { connect } from 'react-redux';
import { scanTag } from '../../provider/geohunterContract'

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
                async () => await scanTag(this.props.user.data.did, this.props.user.data.name, data)
            );

            setTimeout(() => {
                this.setState({ showQrScanner: true });
            }, 3000);
        }
    }

    handleError(err) {
        console.error(err);
    }

    render() {
        return (
            <div>
                { this.state.showQrScanner ?
                    <div>
                        Go to Level {this.props.user.nextTag}
                    </div> : null
                }
                <div>
                    { this.state.showQrScanner ?
                        <QrReader
                            delay={this.state.delay}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ width: "100%" }}
                        /> : <p>Successfully Scanned!</p>
                    }
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
