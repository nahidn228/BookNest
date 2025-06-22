import { Request, Response } from "express";
import Book from "../book/book.model";
import Borrow from "./borrow.model";

const borrowBook = async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).send({
        success: false,
        message: "Book not found",
      });
      return;
    }

    if (book.copies < quantity) {
      res.status(400).send({
        success: false,
        message: "Not enough copies available",
      });
      return;
    }

    // Deduct quantity
    book.copies -= quantity;

    // Call instance method to update availability
    if (typeof book.updateAvailability === "function") {
      book.updateAvailability();
    }

    await book.save();

    // Create borrow record
    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

    res.status(201).send({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to borrow book",
      error,
    });
  }
};

export const borrowController = {
  borrowBook,
};
