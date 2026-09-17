"use client"

import { Card, CardContent, CardTitle, Grid, Text } from "@chenyibo111/ui"

export function GridExample() {
  return <Grid columns={3} gap="4">{["组件", "Token", "Recipes"].map((title) => <Card key={title}><CardContent><CardTitle>{title}</CardTitle><Text size="sm" tone="muted">统一组织可复用能力。</Text></CardContent></Card>)}</Grid>
}
