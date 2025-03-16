import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png"; // Certifique-se de que a logo está na pasta src

function App() {
  const [nomeCliente, setNomeCliente] = useState("");
  const [hectares, setHectares] = useState("");
  const [areaRegularizacao, setAreaRegularizacao] = useState("");
  const [pavimentos, setPavimentos] = useState("");
  const [diarias, setDiarias] = useState("");
  const [tipoServico, setTipoServico] = useState("");
  const [valorTotal, setValorTotal] = useState(0);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoDimensions, setLogoDimensions] = useState({ width: 0, height: 0 });

  // Carregar a logo e garantir que ela esteja pronta antes de gerar o PDF
  useEffect(() => {
    const img = new Image();
    img.src = logo;
    img.onload = () => {
      setLogoDimensions({ width: img.width, height: img.height });
      setLogoLoaded(true);
    };
  }, []);

  const calcularValor = () => {
    let total = 0;
    if (hectares) {
      total += hectares >= 50 ? hectares * 50 : 3000;
    }
    if (areaRegularizacao) {
      total += areaRegularizacao * 15;
    }
    if (pavimentos) {
      total += pavimentos * 1200;
    }
    if (diarias) {
      total += diarias * 1800;
    }
    setValorTotal(total);
  };

  const gerarPDF = () => {
    if (!logoLoaded) {
      alert("A logo ainda está carregando. Tente novamente em alguns segundos.");
      return;
    }

    const doc = new jsPDF();

    // Definir o tamanho da logo
    const imgWidth = 50; // Largura da imagem (ajuste conforme necessário)
    const imgHeight = (imgWidth * logoDimensions.height) / logoDimensions.width; // Altura proporcional

    // Adicionar a logo no topo (documento timbrado)
    doc.addImage(logo, "PNG", 80, 10, imgWidth, imgHeight); // Posição: (x=80, y=10)

    // Título da proposta
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40);
    doc.text("Proposta de Serviço", 105, imgHeight + 20, null, null, "center");

    // Informações do cliente
    doc.setFontSize(12);
    doc.text(`Tipo de Serviço: ${tipoServico}`, 10, imgHeight + 50);

    // Data e hora da proposta
    const dataHora = new Date().toLocaleString("pt-BR");
    doc.text(`Data e Hora: ${dataHora}`, 10, imgHeight + 60);

    // Texto da proposta (substituindo "Cliente" pelo nome do cliente)
    const textoProposta = `
      Prezado(a) ${nomeCliente},

      Agradecemos a oportunidade de apresentar nossa proposta de serviços, elaborada de acordo com as suas necessidades. Nosso compromisso é oferecer soluções personalizadas e de alta qualidade, garantindo eficiência e excelência em cada etapa do processo.

      Este documento contempla os valores estimados para os serviços solicitados, com base nas informações fornecidas. O orçamento é válido por 30 dias a partir da data de emissão.

      Estamos à disposição para esclarecer quaisquer dúvidas ou ajustar a proposta conforme necessário. Contamos com a sua confiança para seguir adiante com este projeto.
    `;
    const lines = doc.splitTextToSize(textoProposta, 180);
    doc.text(lines, 10, imgHeight + 80);

    // Valor total (com espaçamento adequado)
    doc.setFontSize(14);
    doc.text(`Valor Total: R$ ${valorTotal.toFixed(2)}`, 10, imgHeight + 160); // Ajuste o valor de Y para aumentar o espaçamento

    // Assinatura
    doc.setFontSize(12);
    doc.text("________________________", 105, doc.internal.pageSize.height - 60, null, null, "center");
    doc.text("Paulo Cesar de Andrade", 105, doc.internal.pageSize.height - 50, null, null, "center");
    doc.text("Responsável Técnico/Engenheiro Civil", 105, doc.internal.pageSize.height - 40, null, null, "center");

    // Salvar o PDF
    doc.save("proposta.pdf");
  };

  return (
    <Container className="mt-5 p-4 border rounded shadow bg-white">
      {/* Logo na página de inserção da proposta */}
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="Logo"
          style={{ width: "100px", height: "auto" }} // Ajuste o tamanho da logo na UI
        />
      </div>

      <h2 className="text-center">Calculadora de Serviços</h2>
      <Form>
        <Form.Group>
          <Form.Label>Nome do Cliente</Form.Label>
          <Form.Control
            type="text"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tipo de Serviço</Form.Label>
          <Form.Control
            as="select"
            value={tipoServico}
            onChange={(e) => setTipoServico(e.target.value)}
          >
            <option value="">Selecione o tipo de serviço</option>
            <option value="Topografia">Topografia</option>
            <option value="Regularização Urbana">Regularização Urbana</option>
            <option value="Projeto Arquitetônico">Projeto Arquitetônico</option>
            <option value="Condomínio">Condomínio</option>
          </Form.Control>
        </Form.Group>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Área em hectares</Form.Label>
              <Form.Control
                type="number"
                value={hectares}
                onChange={(e) => setHectares(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Área Regularização (m²)</Form.Label>
              <Form.Control
                type="number"
                value={areaRegularizacao}
                onChange={(e) => setAreaRegularizacao(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Número de Pavimentos</Form.Label>
              <Form.Control
                type="number"
                value={pavimentos}
                onChange={(e) => setPavimentos(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Diárias</Form.Label>
              <Form.Control
                type="number"
                value={diarias}
                onChange={(e) => setDiarias(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" className="mt-3" onClick={calcularValor}>
          Calcular Valor
        </Button>
      </Form>
      <h3 className="text-center mt-4">Total: R$ {valorTotal.toFixed(2)}</h3>
      <Button variant="primary" className="mt-3" onClick={gerarPDF}>
        Gerar Proposta em PDF
      </Button>
    </Container>
  );
}

export default App;