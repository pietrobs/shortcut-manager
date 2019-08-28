import React, { Component } from "react";
import { Form, Select, Input, Col, Row, Radio } from "antd";
import ShortcutManager from "../../helpers/ShortcutManager";
import List from "../../components/List";
import WithShortcut from "../../components/WithShortcut";
import Wrapper from "./index.styles";
import generateShortcuts from "./index.shortcuts";

const { Option, OptGroup } = Select;

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedEntrance: 0,
      entrancesShortcuts: [],
      entrances: [
        {
          id: 0,
          name: "Entrada Tipo 1"
        },
        {
          id: 1,
          name: "Entrada Tipo 2"
        },
        {
          id: 2,
          name: "Entrada Tipo 3"
        }
      ],
      shortcuts: []
    };
  }

  componentDidMount() {
    const { form } = this.props;
    const { entrances } = this.state;
    this.setState({
      shortcuts: generateShortcuts(
        this.inputDocumentRef,
        form,
        entrances,
        this.selectEntrance
      )
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  selectEntrance = id => {
    this.setState({ selectedEntrance: id });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { shortcuts, entrances, selectedEntrance } = this.state;
    const { globalShortcuts, genderShortcuts } = shortcuts;

    const documentTypeOptions = (
      <>
        {getFieldDecorator("customer.documentType", {})(
          <Select style={{ width: 200 }} size="large" showAction={["focus"]}>
            <Option value="CPF">CPF</Option>
            <Option value="RG">RG</Option>
            <OptGroup label="Outros">
              <Option value="RNE">RNE</Option>
              <Option value="PASSAPORTE">Passaporte</Option>
              <Option value="CARTEIRA_ESTUDANTE">Carteira de Estudante</Option>
              <Option value="CARTEIRA_MOTORISTA">Carteira de Motorista</Option>
              <Option value="CARTEIRA_TRABALHO">Carteira de Trabalho</Option>
            </OptGroup>
          </Select>
        )}
      </>
    );

    return (
      <Wrapper>
        <ShortcutManager
          ref={shortcutRef => (this.globalShortcut = shortcutRef)}
          bindsConfig={globalShortcuts}
        >
          <Row>
            <Form onSubmit={this.handleSubmit}>
              <Col md={20}>
                <Row>
                  <Col md={8}>
                    <Form.Item
                      label={
                        <WithShortcut
                          text="Documento"
                          id="GO_TO_DOCUMENT"
                          shortcutRef={this.globalShortcut}
                        />
                      }
                    >
                      {getFieldDecorator("customer.document", {
                        initialValue: ""
                      })(
                        <Input
                          autoFocus
                          ref={inputRef => (this.inputDocumentRef = inputRef)}
                          size="large"
                          addonAfter={documentTypeOptions}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={20} />
                <Col md={6}>
                  <Form.Item label="Nome">
                    {getFieldDecorator("customer.firstName", {})(
                      <Input size="large" />
                    )}
                  </Form.Item>
                </Col>
                <Col md={8}>
                  <Form.Item label="Sobrenome">
                    {getFieldDecorator("customer.lastName", {})(
                      <Input size="large" />
                    )}
                  </Form.Item>
                </Col>
                <Col md={8}>
                  <ShortcutManager
                    ref={shortcutRef => (this.genderShortcut = shortcutRef)}
                    bindsConfig={genderShortcuts}
                    forceUpdate={() => {
                      this.forceUpdate();
                    }}
                  >
                    <Form.Item label="Sexo">
                      {getFieldDecorator("customer.gender", {})(
                        <Radio.Group>
                          <Radio value="M">
                            <WithShortcut
                              text="Masculino"
                              id="SELECT_M"
                              shortcutRef={this.genderShortcut}
                            />
                          </Radio>
                          <Radio value="F">
                            <WithShortcut
                              text="Feminino"
                              id="SELECT_F"
                              shortcutRef={this.genderShortcut}
                            />
                          </Radio>
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </ShortcutManager>
                </Col>
              </Col>
              <Col md={4}>
                <List
                  items={entrances}
                  selectedId={selectedEntrance}
                  selectItem={this.selectEntrance}
                  shortcutRef={this.globalShortcut}
                />
              </Col>
            </Form>
          </Row>
        </ShortcutManager>
      </Wrapper>
    );
  }
}

export default Form.create()(Index);
