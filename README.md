# Inventory Management System with AI Assistant

This app is designed to manage inventory with the help of an AI Assistant to help you track your inventory by just asking questions. This app is built using FastAPI for the backend and NextJS for the frontend. FastAPI is a great framework to work with AI model due to its simplicity and high-performance which is important for user experience. In terms of user experience, NextJS is a perfect web framework to build high performance, SEO friendly, and great user experience website due to it's server side rendering and client side rendering capabilities.

## Technologies

- Python
- Typescript
- google/flan-t5-base for LLM
- chromaDB for RAG (Retrieval Augmented Generation)
- FastAPI
- NextJS
- Tailwind
- PostgreSQL

## Dependencies

- LLM (google/flan-t5-base)
- Sentence Transformer (all-MiniLM-L6-v2)

You can use `download_model.py` script to install the dependencies. Change the `model_name` and `local_model_path` accordingly

Run this command in your terminal

```bash
python download_model.py
```

or

```bash
python3 download_model.py
```

## Installation

This app uses docker with docker compose to build and run

```bash
docker compose up --build
```

## Usage

After successfully install and running the app, you can open `http://localhost:3000/register` in your browser and create an account. Once that is done, you can login and start create or add some items, warehouses, and put that items to an inventory by creating the inventory. You can then track the item inside your inventory by asking the AI Assistant from the AI Chat that is placed on the bottom left of the page.

## Enhancements

The app is still in progress with a few enhancements. The AI Assistant is designed to help users track their items within the inventory. This will be usefull for different user role like inventory manager or superviser that is not directly involved with the item inbound or outbound. A seperate mobile application for the AI Assistant would be a great way to extract its full potential. Other than that, the AI Assistant also need to track not just the inventory itself but also the history of the item movement if users have multiple warehouses.
