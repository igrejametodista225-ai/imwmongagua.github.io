> O manual completo está no documento "Manual do App Agenda IMW Mongaguá". Este arquivo é um resumo.

# Agenda IMW Mongaguá — como colocar o app no ar

O app é só de consulta. Ele lê a agenda de uma planilha do Google Planilhas
publicada na web. Quem edita a planilha são só você e a pessoa que você
adicionar como editora. Os membros apenas visualizam pelo app.

```
Você + 1 editor  →  Google Planilhas  →  (link CSV publicado)  →  App no celular dos membros
```

O app já funciona hoje com uma cópia da sua planilha embutida. Depois do
passo 2, ele passa a buscar a versão atualizada toda vez que é aberto e
guarda a última versão para funcionar sem internet.

---

## 1. Levar a planilha para o Google Planilhas (uma vez)

1. Entre no Google Drive com a conta da igreja (ou a sua).
2. Envie o arquivo `Agenda_Local_em_atualização_2027.xlsx`.
3. Abra com **Planilhas Google** e use **Arquivo > Salvar como Planilhas Google**.
   (O link de publicação só funciona em planilha nativa do Google, não no .xlsx.)
4. **Compartilhar**: adicione só a outra pessoa, como **Editor**. Não marque
   "Qualquer pessoa com o link". Assim só vocês dois alteram.

Para continuar como está hoje:
- Não mude a ordem das colunas: MÊS, DIA, SEM, SEM, AGENDA LOCAL, MINISTÉRIO, EVENTOS, MINISTÉRIO, OBS.
- Uma atividade por linha dentro da célula (no Google Planilhas, **Ctrl+Enter** quebra a linha).
- Horário no começo da linha: `19:30 Culto de Fé`. Sem horário aparece como "dia todo".
- Na coluna MINISTÉRIO, quando houver só uma atividade ou só um ministério,
  o app liga o ministério à atividade. Quando houver vários dos dois, ele mostra
  os ministérios no rodapé do dia.
- Na coluna EVENTOS, uma linha começando com "Sob direção..." aparece como observação do dia.
- Você continua podendo baixar em Excel quando quiser: **Arquivo > Fazer download > .xlsx**.

## 2. Publicar a aba da agenda (uma vez)

1. **Arquivo > Compartilhar > Publicar na Web**.
2. Escolha a aba **Agenda 2027 IMW MONGAGUA** e o formato **Valores separados por vírgula (.csv)**.
3. Clique em **Publicar** e copie o link (termina em `output=csv`).
4. Abra o `index.html`, procure `CONFIG` no começo do script e cole o link:

```js
planilhas: [
  "https://docs.google.com/spreadsheets/d/e/....../pub?gid=....&single=true&output=csv",
],
```

O link publicado deixa a agenda legível para quem tiver o link (é o que o app
usa). A edição continua restrita aos editores. O Google pode levar alguns
minutos para refletir uma alteração.

**Ano que vem:** crie a aba 2028 com o mesmo formato, publique também e
acrescente o segundo link na lista. O app junta os anos.

## 2b. Avisos (opcional)

1. Na mesma planilha, crie a aba **Avisos** com as colunas: TÍTULO | MENSAGEM | INÍCIO | FIM
   (o arquivo `Agenda_2027_com_Avisos.xlsx` já vem com ela pronta).
2. **Publicar na Web** > escolha a aba **Avisos** > CSV > Publicar > copie o link.
3. No `index.html`, em `CONFIG`, cole o link em `avisos: "COLE-AQUI"`.

Cada linha é um aviso. INÍCIO e FIM (dd/mm/aaaa) são opcionais: o aviso só aparece
entre essas datas. Para tirar um aviso, apague a linha ou ponha uma data de FIM.
O membro vê o aviso ao abrir o app; depois de tocar em "Entendi" ele não aparece
mais. Se o texto for alterado, conta como aviso novo e aparece de novo. O sino
no topo mostra todos os avisos vigentes a qualquer hora.

Enquanto o link de avisos estiver vazio, o app mostra um aviso de exemplo.

## 3. Hospedar o app (grátis, GitHub Pages)

O app precisa de um endereço na internet. Para a Play Store funcionar sem
barra de navegador, o app deve ficar na raiz do endereço.

1. Crie uma conta em github.com (ex.: usuário `imwmongagua`).
2. Crie um repositório público chamado exatamente **`imwmongagua.github.io`**
   (seu usuário + `.github.io`).
3. **Add file > Upload files** e envie todo o conteúdo desta pasta:
   `index.html`, `manifest.webmanifest`, `sw.js`, `privacidade.html`, `.nojekyll`
   e as pastas `icons` e `.well-known`.
   Se o navegador não enviar os arquivos que começam com ponto, crie-os por
   **Add file > Create new file** digitando o nome (ex.: `.nojekyll`, vazio).
4. **Settings > Pages**: Source = *Deploy from a branch*, branch `main`, pasta `/ (root)`.
5. Em 1 ou 2 minutos o app abre em `https://imwmongagua.github.io/`.
   Teste no celular: no Chrome, menu ⋮ > **Instalar app**. Isso já funciona
   para os membros antes mesmo da Play Store.

Quando trocar o `index.html` no futuro, aumente a versão em `sw.js`
(`agenda-v1` → `agenda-v2`) para os celulares pegarem a versão nova.

## 4. Gerar o pacote Android (PWABuilder, grátis)

1. Acesse **pwabuilder.com**, cole `https://imwmongagua.github.io/` e clique em *Start*.
2. **Package for stores > Android > Generate Package** (opção *Google Play*).
   - Package ID: `io.github.imwmongagua.agenda` (não muda nunca depois de publicado)
   - App name: `Agenda IMW Mongaguá` · Short name: `Agenda IMW`
3. Baixe o .zip. Dentro dele:
   - o arquivo **.aab** (é o que vai para a Play Store);
   - a **chave de assinatura** (`signing.keystore` + senhas). **Guarde em lugar
     seguro.** Sem ela não dá para publicar atualizações do app;
   - o **`assetlinks.json`**: envie para o repositório dentro da pasta
     `.well-known` (fica em `https://imwmongagua.github.io/.well-known/assetlinks.json`).
     Isso tira a barra de endereço do app.

## 5. Publicar na Google Play

1. Crie a conta em **play.google.com/console** (taxa única de US$ 25).
   - Conta **pessoal**: o Google exige um *teste fechado* com pelo menos
     **12 testadores por 14 dias seguidos** antes de liberar para todos.
     Os próprios membros podem ser os testadores (convite por e-mail do Gmail).
   - Conta de **organização** (em nome da igreja): pede CNPJ e número D-U-N-S,
     e não tem essa exigência de teste.
2. **Criar app** > nome, idioma Português (Brasil), App, Gratuito.
3. Preencha:
   - Política de privacidade: `https://imwmongagua.github.io/privacidade.html`
   - Segurança dos dados: **o app não coleta nem compartilha dados**.
   - Classificação de conteúdo: questionário (fica "Livre").
   - Público-alvo: adultos / todas as idades, sem ser direcionado a crianças.
   - Ícone 512×512: `icons/icon-512.png`. Capturas de tela: tire 2 a 4 prints do celular.
4. **Teste fechado** > enviar o .aab > adicionar os testadores > após os 14 dias,
   **Solicitar acesso à produção** > publicar.

---

## Virada de ano

O app serve para qualquer ano: ele lê o ano do título da linha 1 da aba.
Caminho simples: na mesma aba, troque o título para o novo ano e preencha a
agenda nova (o link não muda, nada a fazer no app). Antes, se quiser guardar
o histórico, duplique a aba antiga (não precisa publicar a cópia).

## Dia a dia

- Para mudar a agenda: edite a planilha no Google Planilhas. Mais nada.
- O app atualiza ao abrir e no botão ↻ do topo. Sem internet, mostra a última versão baixada.
- Só mexa no app de novo se quiser mudar visual ou acrescentar o link de outro ano.
