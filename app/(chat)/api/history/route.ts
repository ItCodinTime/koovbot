export function GET() {
  return Response.json({ chats: [], hasMore: false });
}

export function DELETE() {
  return Response.json({ deletedCount: 0 }, { status: 200 });
}
