import React from "react";
import { contactEmail } from "@/data";
import { OPEN_COOKIES_EVENT } from "../CookieConsent";

/**
 * Política de Privacidade e Termos de Uso.
 *
 * Estrutura pensada para a LGPD (Lei 13.709/2018): quem trata, quais dados,
 * para quê, com qual base legal, com quem compartilha, por quanto tempo,
 * direitos do titular e canal de atendimento.
 *
 * REVISAR COM O JURÍDICO antes de publicar. Pontos que dependem da Dix:
 *  - nome do encarregado (DPO), se houver um nomeado;
 *  - provedores realmente usados (hospedagem, medição de acessos);
 *  - prazos de guarda dos contatos comerciais.
 */

const UPDATED = "novembro de 2026";

const H = ({ children }: { children: React.ReactNode }) => (
  <h4 className="mt-7 text-body-medium-semibold font-bold text-fg first:mt-0">{children}</h4>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-2 text-body-small-regular">{children}</p>
);
const List = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="mt-2 list-disc space-y-1.5 pl-5 text-body-small-regular">
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ul>
);
const B = ({ children }: { children: React.ReactNode }) => (
  <strong className="font-bold text-fg">{children}</strong>
);
const Mail = () => (
  <a
    href={`mailto:${contactEmail}`}
    className="text-fg underline decoration-accent underline-offset-4 hover:text-accent"
  >
    {contactEmail}
  </a>
);

export const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      {/* o título "Política de Privacidade" vem da janela que exibe este texto */}
      <p className="text-body-small-regular">Última atualização: {UPDATED}.</p>
      <P>
        Esta política explica como a DixHealth trata os dados pessoais de quem
        visita este site, de acordo com a Lei Geral de Proteção de Dados
        Pessoais (LGPD, Lei nº 13.709/2018).
      </P>

      <H>1. Quem é responsável pelos seus dados</H>
      <P>
        O controlador é a <B>DixHealth</B>, CNPJ 39.336.761/0001-54, com sede
        na Rod. do Sol, 2780, Sala 908, Praia de Itaparica, Vila Velha – ES.
      </P>
      <P>
        Para falar com o encarregado pelo tratamento de dados pessoais, ou
        para qualquer assunto desta política, escreva para <Mail />.
      </P>

      <H>2. Quais dados tratamos</H>
      <List
        items={[
          <>
            <B>Dados que você nos envia.</B> Quando você fala com a Dix pelo
            WhatsApp, por e-mail ou por telefone, recebemos o seu nome, o
            telefone ou o e-mail usado e o conteúdo da mensagem. O site não
            tem formulário e não pede cadastro.
          </>,
          <>
            <B>Dados de navegação.</B> Somente com a sua permissão, medimos
            visitas de forma agregada: páginas vistas, site de origem, tipo de
            aparelho e de navegador e país aproximado. Essas informações não
            identificam você.
          </>,
          <>
            <B>Registros de acesso.</B> O provedor de hospedagem registra
            endereço IP, data e hora de cada acesso, como exige o Marco Civil
            da Internet (Lei nº 12.965/2014).
          </>,
        ]}
      />
      <P>
        Não pedimos dados pessoais sensíveis. Por favor, não envie dados de
        saúde, seus ou de pacientes, pelos canais de contato do site.
      </P>

      <H>3. Para que usamos e com qual base legal</H>
      <List
        items={[
          <>
            <B>Responder ao seu contato e apresentar propostas:</B>{" "}
            procedimentos preliminares a um contrato, a seu pedido (LGPD, art.
            7º, V), e legítimo interesse (art. 7º, IX).
          </>,
          <>
            <B>Medir o uso do site para melhorá-lo:</B> o seu consentimento
            (art. 7º, I), que pode ser retirado a qualquer momento.
          </>,
          <>
            <B>Guardar registros de acesso:</B> cumprimento de obrigação legal
            (art. 7º, II).
          </>,
          <>
            <B>Manter o site seguro e prevenir fraudes:</B> legítimo interesse
            (art. 7º, IX).
          </>,
        ]}
      />
      <P>Não usamos os seus dados para decisões automatizadas nem os vendemos.</P>

      <H>4. Cookies e armazenamento no navegador</H>
      <P>
        Cookies e tecnologias parecidas são pequenos registros guardados no
        seu navegador. Este site usa duas categorias:
      </P>
      <List
        items={[
          <>
            <B>Essenciais.</B> Guardam a sua escolha de cookies e as
            preferências de exibição do site. São necessários para o site
            funcionar e não podem ser desativados aqui.
          </>,
          <>
            <B>Análise.</B> Permitem contar visitas e páginas mais vistas, de
            forma agregada. Só são ativados se você aceitar.
          </>,
        ]}
      />
      <P>
        Na primeira visita você escolhe entre aceitar todos, ficar só com os
        essenciais ou personalizar. Para mudar de ideia, abra as{" "}
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(OPEN_COOKIES_EVENT))}
          className="text-fg underline decoration-accent underline-offset-4 hover:text-accent"
        >
          Preferências de cookies
        </button>{" "}
        (o link também fica no rodapé). Você ainda pode apagar ou bloquear
        cookies nas configurações do seu navegador; nesse caso, o site pode
        perguntar de novo sobre a sua escolha.
      </P>

      <H>5. Com quem compartilhamos</H>
      <List
        items={[
          <>
            <B>Prestadores de serviço</B> que operam o site em nosso nome,
            como hospedagem e medição de acessos, apenas no necessário para
            prestar o serviço.
          </>,
          <>
            <B>WhatsApp.</B> Ao clicar nos botões de contato, você é levado ao
            WhatsApp, serviço da Meta, que trata os seus dados conforme a
            política de privacidade dele.
          </>,
          <>
            <B>Autoridades públicas,</B> quando houver obrigação legal ou
            ordem judicial.
          </>,
        ]}
      />

      <H>6. Transferência internacional</H>
      <P>
        Alguns desses prestadores mantêm servidores fora do Brasil. Nesses
        casos, a transferência segue as hipóteses previstas na LGPD (art. 33)
        e é feita com fornecedores que adotam garantias de proteção de dados.
      </P>

      <H>7. Por quanto tempo guardamos</H>
      <List
        items={[
          "Mensagens e dados de contato: pelo tempo necessário para atender ao seu pedido e manter o relacionamento comercial, e depois pelos prazos exigidos em lei.",
          "Registros de acesso: pelo prazo exigido em lei.",
          "Sua escolha de cookies: fica no seu navegador até você apagá-la ou até mudarmos as categorias.",
        ]}
      />

      <H>8. Seus direitos</H>
      <P>Como titular dos dados, você pode pedir, a qualquer momento (LGPD, art. 18):</P>
      <List
        items={[
          "a confirmação de que tratamos os seus dados e o acesso a eles;",
          "a correção de dados incompletos, inexatos ou desatualizados;",
          "a anonimização, o bloqueio ou a eliminação de dados desnecessários ou tratados em desacordo com a lei;",
          "a portabilidade dos dados;",
          "a eliminação dos dados tratados com o seu consentimento;",
          "a informação sobre com quem compartilhamos os seus dados;",
          "a informação sobre a possibilidade de não consentir e as consequências disso;",
          "a revogação do consentimento.",
        ]}
      />
      <P>
        Para exercer esses direitos, escreva para <Mail />. Podemos pedir
        informações para confirmar a sua identidade, e respondemos nos prazos
        da lei. Você também pode apresentar reclamação à Autoridade Nacional
        de Proteção de Dados (ANPD).
      </P>

      <H>9. Segurança</H>
      <P>
        Adotamos medidas técnicas e administrativas para proteger os dados
        contra acesso não autorizado, perda ou alteração. Nenhum sistema é
        totalmente seguro; se ocorrer um incidente que possa causar risco ou
        dano relevante, comunicaremos você e a ANPD, como prevê a lei.
      </P>

      <H>10. Crianças e adolescentes</H>
      <P>
        Este site é voltado a empresas e profissionais e não se destina a
        menores de 18 anos. Não coletamos intencionalmente dados de crianças
        e adolescentes.
      </P>

      <H>11. Alterações nesta política</H>
      <P>
        Podemos atualizar esta política para refletir mudanças no site ou na
        legislação. A versão em vigor é sempre a publicada aqui, com a data
        da última atualização no topo.
      </P>

      <h3 className="mt-10 border-t border-border pt-8 text-title-small font-bold text-fg">
        Termos de Uso
      </h3>

      <H>Aceitação</H>
      <P>
        Ao acessar este site, você concorda com estes Termos de Uso. Se não
        concordar, pedimos que interrompa o uso.
      </P>

      <H>Objetivo do site</H>
      <P>
        O site apresenta a DixHealth, seus serviços e produtos, e oferece
        canais de contato.
      </P>

      <H>Uso permitido</H>
      <P>Você concorda em usar o site apenas para fins lícitos. É proibido:</P>
      <List
        items={[
          "praticar qualquer ato que prejudique o funcionamento do site;",
          "tentar acessar áreas protegidas ou não destinadas ao público.",
        ]}
      />

      <H>Propriedade intelectual</H>
      <P>
        Textos, imagens, vídeos, marcas e layout deste site pertencem à
        DixHealth ou a seus licenciantes e são protegidos por lei. A
        reprodução ou o uso sem autorização são proibidos. As telas de produto
        exibidas são ilustrativas e usam dados fictícios.
      </P>

      <H>Limitação de responsabilidade</H>
      <P>
        A DixHealth se esforça para manter o site disponível e correto, mas
        não garante funcionamento ininterrupto nem responde por danos
        decorrentes de falhas de acesso, na medida permitida pela lei.
      </P>

      <H>Alterações e lei aplicável</H>
      <P>
        Estes termos podem ser alterados a qualquer momento; as mudanças
        valem a partir da publicação. Eles são regidos pelas leis do Brasil.
      </P>

      <H>Contato</H>
      <P>
        Dúvidas sobre esta política ou sobre os termos: <Mail />.
      </P>
    </div>
  );
};
