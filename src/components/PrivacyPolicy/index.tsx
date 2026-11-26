import React from "react";
import { contactEmail, whatsappLink, whatsappMessages } from "@/data";
import { OPEN_COOKIES_EVENT } from "../CookieConsent";

/**
 * Política de Privacidade e Termos de Uso.
 *
 * Estrutura pensada para a LGPD (Lei 13.709/2018): quem trata, quais dados,
 * para quê, com qual base legal, com quem compartilha, por quanto tempo,
 * direitos do titular e canal de atendimento.
 *
 * REVISAR COM O JURÍDICO antes de publicar. Pontos que dependem da Dix:
 *  - contrato e plano da Vercel (transferência internacional de dados).
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
const linkClass = "text-fg underline decoration-accent underline-offset-4 hover:text-accent";

/** Encarregado pelo tratamento de dados pessoais (LGPD, art. 41). */
const dpo = {
  name: "João Gonçalves",
  company: "HDPO - Consultoria LTDA",
  email: "joaogoncalves@hdpo.com.br",
  phone: "(31) 9 9161-1736",
  tel: "+5531991611736",
};

const Mail = () => (
  <a href={`mailto:${contactEmail}`} className={linkClass}>
    {contactEmail}
  </a>
);
const DataWhatsApp = () => (
  <a
    href={whatsappLink(whatsappMessages.dados)}
    target="_blank"
    rel="noopener noreferrer"
    className={linkClass}
  >
    WhatsApp da Dix
    <span className="sr-only"> (abre em nova aba)</span>
  </a>
);
const DpoMail = () => (
  <a href={`mailto:${dpo.email}`} className={linkClass}>
    {dpo.email}
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
        O controlador é a{" "}
        <B>Dixhealth Desenvolvimento e Manutenção de Sistemas de Tecnologia LTDA</B>{" "}
        (DixHealth), CNPJ 39.336.761/0001-54, com sede na Rod. do Sol, 2780,
        Sala 908, Praia de Itaparica, Vila Velha – ES.
      </P>
      <P>
        O encarregado pelo tratamento de dados pessoais (DPO) é a{" "}
        <B>{dpo.company}</B>, representada por <B>{dpo.name}</B>. É com ele
        que você fala sobre os seus dados e sobre esta política:
      </P>
      <List
        items={[
          <>
            E-mail: <DpoMail />
          </>,
          <>
            Telefone:{" "}
            <a href={`tel:${dpo.tel}`} className={linkClass}>
              {dpo.phone}
            </a>
          </>,
          <>
            <DataWhatsApp />: também recebemos por lá os pedidos sobre os
            seus dados.
          </>,
        ]}
      />

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
            <B>Dados de navegação.</B> Só com a sua permissão, medimos as
            visitas: páginas vistas, site de origem, tipo de aparelho,
            navegador e localização aproximada (país e, às vezes, estado e
            cidade). A medição não usa cookies. Para não contar a mesma visita
            duas vezes, o fornecedor cria um código temporário a partir dos
            dados da conexão e o descarta em até 24 horas. Não usamos essas
            informações para identificar você.
          </>,
          <>
            <B>Registros de acesso.</B> O nosso provedor de hospedagem, a
            Vercel, registra endereço IP, data e hora de cada acesso para
            entregar as páginas e proteger o site contra ataques. Esses
            registros ficam guardados pelo prazo do plano que contratamos
            com a Vercel.
          </>,
        ]}
      />
      <P>
        Não pedimos dados pessoais sensíveis. Por favor, não envie dados de
        saúde, seus ou de pacientes, pelos canais de contato do site. Se isso
        acontecer, usaremos a informação só para responder e a apagaremos em
        seguida.
      </P>

      <H>3. Para que usamos e com qual base legal</H>
      <List
        items={[
          <>
            <B>Responder ao seu contato e apresentar propostas:</B> legítimo
            interesse (LGPD, art. 7º, IX), porque foi você quem nos procurou.
            Se você contrata em seu próprio nome, a base é a preparação de um
            contrato a seu pedido (art. 7º, V).
          </>,
          <>
            <B>Manter contato comercial depois do primeiro atendimento:</B>{" "}
            legítimo interesse (art. 7º, IX). Você pode pedir para parar a
            qualquer momento.
          </>,
          <>
            <B>Medir o uso do site para melhorá-lo:</B> o seu consentimento
            (art. 7º, I), que pode ser retirado a qualquer momento.
          </>,
          <>
            <B>Registrar acessos e manter o site seguro:</B> legítimo
            interesse (art. 7º, IX).
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
            <B>Vercel Inc. (Estados Unidos).</B> Hospeda o site e faz a
            medição de acessos em nosso nome, só no necessário para prestar o
            serviço.
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
        A hospedagem e a medição de acessos são feitas pela Vercel Inc.,
        empresa dos Estados Unidos. Por isso, os registros de acesso e os
        dados de medição podem ser processados nos Estados Unidos. O WhatsApp,
        da Meta, também processa dados fora do Brasil, conforme a política de
        privacidade dele. Para saber mais sobre essas transferências, fale
        com o encarregado.
      </P>

      <H>7. Por quanto tempo guardamos</H>
      <List
        items={[
          "Mensagens e dados de contato: enquanto durar a conversa comercial e por até 2 anos depois do último contato. Se você virar cliente, valem os prazos do contrato e da lei. Você pode pedir a exclusão antes disso.",
          "Registros de acesso: pelo prazo do plano que contratamos com a Vercel, nosso provedor de hospedagem.",
          "Sua escolha de cookies: fica no seu navegador por até 12 meses, até você apagá-la ou até mudarmos as categorias. Depois disso, perguntamos de novo.",
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
          "a revogação do consentimento;",
          "a oposição a um tratamento feito com base em legítimo interesse, se você entender que ele não respeita a lei.",
        ]}
      />
      <P>
        Para exercer esses direitos, escreva para o encarregado, em{" "}
        <DpoMail />, ou chame no <DataWhatsApp />. O pedido é gratuito. Podemos pedir só o necessário para
        confirmar a sua identidade. Respondemos em até 15 dias. Você também
        pode apresentar reclamação à Autoridade Nacional de Proteção de Dados
        (ANPD).
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
        Se a mudança afetar algo que depende da sua
        permissão, como a medição de acessos, vamos perguntar de novo antes
        de continuar.
      </P>

      <h3 className="mt-10 border-t border-border pt-8 text-title-small font-bold text-fg">
        Termos de Uso
      </h3>

      <H>Aceitação</H>
      <P>
        O uso deste site segue estes Termos de Uso. Se não concordar com
        eles, pedimos que não use o site.
      </P>

      <H>Objetivo do site</H>
      <P>
        O site apresenta a DixHealth, seus serviços e produtos, e oferece
        canais de contato. As informações são de apresentação e não são
        proposta comercial. Preços, prazos e funções de cada produto são
        definidos em contrato. O conteúdo não é orientação médica.
      </P>
      <P>
        As funções de inteligência artificial apresentadas, como a OMNIX, são
        de apoio. Elas resumem, sugerem e avisam, mas não tomam decisões
        clínicas nem executam ações por conta própria: a decisão cabe sempre
        ao profissional de saúde.
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
      <P>
        As marcas e os logotipos de clientes, parceiros e serviços de
        terceiros, como o WhatsApp, pertencem aos seus donos. A presença deles
        aqui não significa patrocínio nem endosso.
      </P>

      <H>Limitação de responsabilidade</H>
      <P>
        A DixHealth se esforça para manter o site disponível e correto, mas
        não garante funcionamento ininterrupto. Na medida permitida pela lei,
        não responde por danos causados por falhas de acesso ou por sites de
        terceiros para os quais o site aponta, como WhatsApp, LinkedIn e
        Instagram. Nada aqui limita direitos que a lei garante a você,
        inclusive os da LGPD e, quando for o caso, os do Código de Defesa do
        Consumidor.
      </P>

      <H>Alterações, lei aplicável e foro</H>
      <P>
        Estes termos podem ser alterados a qualquer momento; as mudanças
        valem a partir da publicação. Eles são regidos pelas leis do Brasil.
        Fica eleito o foro de Vila Velha – ES, salvo quando a lei garantir a
        você outro foro, como o do seu domicílio se você for consumidor.
      </P>

      <H>Contato</H>
      <P>
        Dúvidas sobre os termos ou sobre o site: <Mail />. Assuntos de
        dados pessoais: <DpoMail />.
      </P>
    </div>
  );
};
