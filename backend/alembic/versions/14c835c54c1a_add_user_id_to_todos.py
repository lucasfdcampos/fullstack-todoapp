"""Add user_id to todos

Revision ID: 14c835c54c1a
Revises: 0e2ba8b75aaa
Create Date: 2025-04-18 11:49:34.743332

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '14c835c54c1a'
down_revision: Union[str, None] = '0e2ba8b75aaa'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.add_column('todos', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'todos', 'users', ['user_id'], ['id'])


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_constraint(None, 'todos', type_='foreignkey')
    op.drop_column('todos', 'user_id')
