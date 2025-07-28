# Node.js の公式イメージを使用
FROM node:20

# 作業ディレクトリを作成
WORKDIR /app

# パッケージをコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリのコードをコピー
COPY . .

# 必要であればビルド
RUN npm run build

# アプリを起動（npm run start:dev にしたい場合は開発用に変更）
CMD ["npm", "run", "start"]

# NestJSはデフォルトで3000番ポートを使うので公開
EXPOSE 3000
