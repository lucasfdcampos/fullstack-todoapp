"""Create todos table

Revision ID: 0e2ba8b75aaa
Revises: 0375969a330b
Create Date: 2025-04-18 11:43:24.896830

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from datetime import datetime

# revision identifiers, used by Alembic.
revision: str = '0e2ba8b75aaa'
down_revision: Union[str, None] = '0375969a330b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table(
        'todos',
        sa.Column('id', sa.Integer(), primary_key=True, index=True),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=True),
        sa.Column('completed', sa.Boolean(), default=False),
        sa.Column('created_at', sa.DateTime(), default=datetime.utcnow),
        sa.Column('updated_at', sa.DateTime(), default=datetime.utcnow, onupdate=datetime.utcnow)
    )

def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('todos')
