import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Content} from "native-base";

class ScreenEditProfil extends Component {
    render() {
        return (
            <Container>
                <Content>

                </Content>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(ScreenEditProfil);
