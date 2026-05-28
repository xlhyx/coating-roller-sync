// app.js - 涂布轮库存管理 Web 版（JSONBin 同步）

const JSONBIN_ID = '6a188196ddf5aa59f770ed0f'
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_ID}`
const JSONBIN_ACCESS_KEY = '$2a$10$4uT2Hadw4jwvh9dgpsFH6eieMNX5bUVjYIk3JRTG/vJn3UB1P03ra'

let rollers = []
let currentZone = ''
let sortType = 'id'
let sortAsc = true
let searchKey = ''
let editingId = null
let viewingId = null

// ============ 数据层 ============
function loadData() {
  loadFromJSONBin(function(success) {
    if (!success || rollers.length === 0) {
      initData()
      saveToJSONBin()
    }
    render()
  })
}

function loadFromJSONBin(callback) {
  fetch(JSONBIN_URL + '/latest', { headers: { 'X-Access-Key': JSONBIN_ACCESS_KEY } })
    .then(res => res.json())
    .then(data => {
      if (data.record && Array.isArray(data.record)) {
        rollers = data.record
        callback(true)
      } else {
        callback(false)
      }
    })
    .catch(err => {
      console.error('加载失败', err)
      callback(false)
    })
}

function saveToJSONBin(callback) {
  fetch(JSONBIN_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Access-Key': JSONBIN_ACCESS_KEY },
    body: JSON.stringify(rollers)
  })
    .then(res => res.json())
    .then(data => {
      if (callback) callback(!!data.metadata)
    })
    .catch(err => {
      console.error('保存失败', err)
      if (callback) callback(false)
    })
}

function initData() {
  const initialData = [
    { code: 'A43', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-01-05', remark: '绿色' },
    { code: 'A44', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-01-05' },
    { code: 'A48', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-01-16' },
    { code: 'A49', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-01-16' },
    { code: 'A50', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-01-23', remark: '2' },
    { code: 'A52', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-02-10' },
    { code: 'A55', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-03-05', remark: '发红' },
    { code: 'A56', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-03-17' },
    { code: 'A58', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-04-09' },
    { code: 'B33', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2025-12-22' },
    { code: 'B35', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-01-05', remark: '1' },
    { code: 'B37', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-01-05' },
    { code: 'B39', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-01-16', remark: '塞孔' },
    { code: 'B43', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-01-29', remark: '2' },
    { code: 'B45', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-03-05' },
    { code: 'B47', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-03-12', remark: 'pu测试' },
    { code: 'B48', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-03-17' },
    { code: 'B49', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-03-17' },
    { code: 'B50', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-04-09' },
    { code: 'B51', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-04-09' },
    { code: 'B52', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-04-09' },
    { code: 'C14', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2025-11-04', remark: '1' },
    { code: 'C18', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-01-05' },
    { code: 'C19', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-01-05' },
    { code: 'C21', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-04-09' },
    { code: 'C22', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-04-09' },
    { code: 'F1', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-01-05' },
    { code: 'F2', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-01-23', remark: 'pu' },
    { code: 'P600', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000 },
    { code: 'S2', zone: '使用区', status: '使用中', usedCount: 0, maxCount: 10000, enterDate: '2026-02-28' },
    { code: 'A46', zone: '待测试区', status: '待测试', usedCount: 0, maxCount: 10000, enterDate: '2026-01-05' },
    { code: 'A51', zone: '待测试区', status: '待测试', usedCount: 0, maxCount: 10000, enterDate: '2026-01-23' },
    { code: 'A57', zone: '待测试区', status: '待测试', usedCount: 0, maxCount: 10000, enterDate: '2026-03-17' },
    { code: 'C20', zone: '待测试区', status: '待测试', usedCount: 0, maxCount: 10000, enterDate: '2026-02-28' },
    { code: 'B53', zone: '待测试区', status: '待测试', usedCount: 0, maxCount: 10000, enterDate: '2026-04-09', remark: 'pu' },
    { code: 'A60', zone: '待测试区', status: '待测试', usedCount: 0, maxCount: 10000, enterDate: '2026-05-11' },
    { code: 'B54', zone: '待测试区', status: '待测试', usedCount: 0, maxCount: 10000, enterDate: '2026-05-11' },
    { code: 'B55', zone: '待测试区', status: '待测试', usedCount: 0, maxCount: 10000, enterDate: '2026-05-11' },
    { code: 'B56', zone: '待测试区', status: '待测试', usedCount: 0, maxCount: 10000, enterDate: '2026-05-11' },
    { code: 'C23', zone: '待测试区', status: '待测试', usedCount: 0, maxCount: 10000, enterDate: '2026-05-11' },
  ]

  const now = new Date()
  initialData.forEach(item => {
    item._id = 'r_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6)
    item.createTime = now
    item.updateTime = now
  })

  rollers = initialData
  saveToJSONBin()
}

function getById(id) {
  return rollers.find(r => r._id === id)
}

function addRoller(data) {
  const now = new Date()
  const item = {
    ...data,
    _id: 'r_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
    createTime: now,
    updateTime: now,
    usedCount: Number(data.usedCount) || 0,
    maxCount: Number(data.maxCount) || 10000,
  }
  rollers.push(item)
  saveToJSONBin()
}

function updateRoller(id, data) {
  const idx = rollers.findIndex(r => r._id === id)
  if (idx === -1) return
  rollers[idx] = {
    ...rollers[idx],
    ...data,
    updateTime: new Date(),
    usedCount: Number(data.usedCount) !== undefined ? Number(data.usedCount) : rollers[idx].usedCount,
    maxCount: Number(data.maxCount) !== undefined ? Number(data.maxCount) : rollers[idx].maxCount,
  }
  saveToJSONBin()
}

function deleteRoller(id) {
  rollers = rollers.filter(r => r._id !== id)
  saveToJSONBin()
}

// ============ 渲染层 ============
function render() {
  let filtered = [...rollers]

  if (searchKey) {
    const key = searchKey.toLowerCase()
    filtered = filtered.filter(r =>
      r.code.toLowerCase().includes(key) ||
      (r.remark || '').toLowerCase().includes(key)
    )
  }

  if (currentZone) {
    filtered = filtered.filter(r => r.zone === currentZone)
  }

  filtered.sort((a, b) => {
    if (sortType === 'id') {
      return sortAsc ? a.code.localeCompare(b.code) : b.code.localeCompare(a.code)
    } else {
      const pa = a.maxCount ? Math.round((a.usedCount / a.maxCount) * 100) : 0
      const pb = b.maxCount ? Math.round((b.usedCount / b.maxCount) * 100) : 0
      return sortAsc ? pa - pb : pb - pa
    }
  })

  const stats = {
    using: rollers.filter(r => r.zone === '使用区').length,
    backup: rollers.filter(r => r.zone === '备用区').length,
    testing: rollers.filter(r => r.zone === '待测试区').length,
    scrapped: rollers.filter(r => r.zone === '报废区').length,
  }

  document.getElementById('statUsing').textContent = stats.using
  document.getElementById('statBackup').textContent = stats.backup
  document.getElementById('statTesting').textContent = stats.testing
  document.getElementById('statScrapped').textContent = stats.scrapped

  document.getElementById('filterZone').firstChild.textContent = currentZone || '全部分区'
  const sortLabel = sortType === 'id' ? '按编号' : '按寿命'
  const sortArrow = sortAsc ? '↑' : '↓'
  document.getElementById('filterSort').firstChild.textContent = sortLabel
  document.getElementById('filterSort').lastChild.textContent = sortArrow

  const listEl = document.getElementById('rollerList')
  if (filtered.length === 0) {
    listEl.innerHTML = '<div class="empty"><span class="empty-icon">📭</span><span>暂无数据</span></div>'
    return
  }

  listEl.innerHTML = filtered.map(r => {
    const pct = r.maxCount ? Math.round((r.usedCount / r.maxCount) * 100) : 0
    const pctClass = pct <= 50 ? 'low' : pct <= 80 ? 'mid' : 'high'
    const zoneClass = r.zone === '使用区' ? 'using' :
                     r.zone === '备用区' ? 'backup' :
                     r.zone === '待测试区' ? 'testing' :
                     r.zone === '报废区' ? 'scrapped' : 'abnormal'
    const statusClass = r.status === '使用中' ? 'using' :
                       r.status === '备用' ? 'backup' :
                       r.status === '待测试' ? 'testing' :
                       r.status === '报废' ? 'scrapped' : 'abnormal'
    const updateStr = r.updateTime ? (new Date(r.updateTime).getMonth() + 1) + '-' + new Date(r.updateTime).getDate() : ''

    return `
      <div class="roller-card" onclick="openDetail('${r._id}')">
        <div class="roller-header">
          <span class="roller-id">${r.code}</span>
          <span class="zone-pill ${zoneClass}">${r.zone}</span>
        </div>
        <div class="roller-body">
          <div class="life-info">
            <span class="life-num">${r.usedCount || 0}</span>
            <span class="life-unit">片</span>
            <span class="life-sep">/</span>
            <span class="life-total">${r.maxCount || '-'}</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill ${pctClass}" style="width:${pct}%"></div>
          </div>
          <span class="life-percent">${pct}%</span>
        </div>
        <div class="roller-footer">
          <span class="update-time">${updateStr}</span>
          <div class="status-row">
            <div class="status-dot ${statusClass}"></div>
            <span class="status-text">${r.status}</span>
          </div>
        </div>
      </div>
    `
  }).join('')
}

// ============ 交互 ============
function openModal(id) {
  editingId = id || null
  const overlay = document.getElementById('modalOverlay')
  const title = document.getElementById('modalTitle')

  if (editingId) {
    title.textContent = '编辑涂布轮'
    const r = getById(editingId)
    document.getElementById('formCode').value = r.code
    document.getElementById('formName').value = r.name || ''
    document.getElementById('formEnterDate').value = r.enterDate || ''
    document.getElementById('formStartUseDate').value = r.startUseDate || ''
    document.getElementById('formZone').value = r.zone
    document.getElementById('formStatus').value = r.status
    document.getElementById('formUsedCount').value = r.usedCount || 0
    document.getElementById('formMaxCount').value = r.maxCount || ''
    document.getElementById('formRemark').value = r.remark || ''
  } else {
    title.textContent = '新建涂布轮'
    document.getElementById('formCode').value = ''
    document.getElementById('formName').value = ''
    document.getElementById('formEnterDate').value = ''
    document.getElementById('formStartUseDate').value = ''
    document.getElementById('formZone').value = '使用区'
    document.getElementById('formStatus').value = '使用中'
    document.getElementById('formUsedCount').value = '0'
    document.getElementById('formMaxCount').value = '10000'
    document.getElementById('formRemark').value = ''
  }

  overlay.classList.add('show')
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show')
  editingId = null
}

function openDetail(id) {
  viewingId = id
  const r = getById(id)
  if (!r) return

  const overlay = document.getElementById('detailOverlay')
  document.getElementById('detailCode').textContent = r.code

  const pct = r.maxCount ? Math.round((r.usedCount / r.maxCount) * 100) : 0

  document.getElementById('detailBody').innerHTML = `
    <div class="section-title">基本信息</div>
    <div class="detail-info">
      <div class="detail-row">
        <span class="detail-label">名称/规格</span>
        <span class="detail-value">${r.name || '-'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">状态</span>
        <span class="detail-value" style="color:${r.status==='使用中'?'#34C759':r.status==='备用'?'#007AFF':r.status==='待测试'?'#FF9500':'#8E8E93'}">${r.status}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">入厂日期</span>
        <span class="detail-value">${r.enterDate || '-'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">开始使用日期</span>
        <span class="detail-value">${r.startUseDate || '-'}</span>
      </div>
    </div>
    <div class="section-title">使用情况</div>
    <div class="detail-info">
      <div class="detail-row">
        <span class="detail-label">已加工片数</span>
        <span class="detail-value highlight">${r.usedCount || 0}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">预计总片数</span>
        <span class="detail-value">${r.maxCount || '-'}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">寿命</span>
        <span class="detail-value highlight">${pct}%</span>
      </div>
    </div>
    <div class="section-title">备注</div>
    <div class="remark-card">${(r.remark || '暂无备注').replace(/\n/g, '<br>')}</div>
  `

  overlay.classList.add('show')
}

function closeDetail() {
  document.getElementById('detailOverlay').classList.remove('show')
  viewingId = null
}

function exportCSV() {
  if (rollers.length === 0) {
    alert('暂无数据')
    return
  }
  const headers = ['编号', '分区', '状态', '已加工片数', '预计总片数', '入厂日期', '备注']
  const rows = rollers.map(r => [
    r.code || '',
    r.zone || '',
    r.status || '',
    r.usedCount || 0,
    r.maxCount || '',
    r.enterDate || '',
    (r.remark || '').replace(/,/g, '，')
  ])
  let csv = '\uFEFF' + headers.join(',') + '\n'
  rows.forEach(row => { csv += row.join(',') + '\n' })
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = '涂布轮数据_' + new Date().toISOString().slice(0,10) + '.csv'
  a.click()
  URL.revokeObjectURL(url)
}

// ============ 事件绑定 ============
document.getElementById('searchInput').addEventListener('input', function() {
  searchKey = this.value
  document.getElementById('searchClear').classList.toggle('show', !!searchKey)
  render()
})

document.getElementById('searchClear').addEventListener('click', function() {
  document.getElementById('searchInput').value = ''
  searchKey = ''
  this.classList.remove('show')
  render()
})

document.getElementById('filterZone').addEventListener('click', function() {
  const zones = ['', '使用区', '备用区', '待测试区', '报废区', '异常待确认区']
  const currentIdx = zones.indexOf(currentZone)
  const nextIdx = (currentIdx + 1) % zones.length
  currentZone = zones[nextIdx]
  render()
})

document.getElementById('filterSort').addEventListener('click', function() {
  if (sortType === 'id') {
    sortType = 'life'
  } else {
    sortAsc = !sortAsc
  }
  render()
})

document.getElementById('btnExport').addEventListener('click', exportCSV)

document.getElementById('btnSync').addEventListener('click', function() {
  loadFromJSONBin(function(success) {
    if (success) {
      render()
      alert('✅ 同步成功！已从云端获取最新数据')
    } else {
      alert('❌ 同步失败，请检查网络')
    }
  })
})

document.getElementById('btnAdd').addEventListener('click', () => openModal(null))

document.getElementById('modalClose').addEventListener('click', closeModal)
document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal()
})

document.getElementById('detailClose').addEventListener('click', closeDetail)
document.getElementById('detailOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeDetail()
})

document.getElementById('btnCancel').addEventListener('click', closeModal)

document.getElementById('btnSave').addEventListener('click', function() {
  const code = document.getElementById('formCode').value.trim()
  if (!code) {
    alert('请填写编号')
    return
  }
  const duplicate = rollers.find(r => r.code === code && r._id !== editingId)
  if (duplicate) {
    alert('编号已存在：' + code)
    return
  }
  const data = {
    code,
    name: document.getElementById('formName').value.trim(),
    enterDate: document.getElementById('formEnterDate').value,
    startUseDate: document.getElementById('formStartUseDate').value,
    zone: document.getElementById('formZone').value,
    status: document.getElementById('formStatus').value,
    usedCount: Number(document.getElementById('formUsedCount').value) || 0,
    maxCount: Number(document.getElementById('formMaxCount').value) || 10000,
    remark: document.getElementById('formRemark').value.trim(),
  }
  if (data.status === '使用中' && data.zone !== '使用区') data.zone = '使用区'
  if (data.status === '备用' && data.zone !== '备用区') data.zone = '备用区'
  if (data.status === '待测试' && data.zone !== '待测试区') data.zone = '待测试区'
  if (data.status === '报废' && data.zone !== '报废区') data.zone = '报废区'
  if (data.status === '异常' && data.zone !== '异常待确认区') data.zone = '异常待确认区'

  if (editingId) {
    updateRoller(editingId, data)
  } else {
    addRoller(data)
  }
  closeModal()
  render()
})

document.getElementById('btnChangeStatus').addEventListener('click', function() {
  if (!viewingId) return
  const r = getById(viewingId)
  const statuses = ['使用中', '备用', '待测试', '异常', '报废']
  const currentIdx = statuses.indexOf(r.status)
  const nextIdx = (currentIdx + 1) % statuses.length
  const newStatus = statuses[nextIdx]
  let newZone = r.zone
  if (newStatus === '使用中') newZone = '使用区'
  else if (newStatus === '备用') newZone = '备用区'
  else if (newStatus === '待测试') newZone = '待测试区'
  else if (newStatus === '异常') newZone = '异常待确认区'
  else if (newStatus === '报废') newZone = '报废区'
  updateRoller(viewingId, { status: newStatus, zone: newZone })
  openDetail(viewingId)
  render()
})

document.getElementById('btnChangeZone').addEventListener('click', function() {
  if (!viewingId) return
  const r = getById(viewingId)
  const zones = ['使用区', '备用区', '待测试区', '报废区', '异常待确认区']
  const currentIdx = zones.indexOf(r.zone)
  const nextIdx = (currentIdx + 1) % zones.length
  const newZone = zones[nextIdx]
  let newStatus = r.status
  if (newZone === '使用区') newStatus = '使用中'
  else if (newZone === '备用区') newStatus = '备用'
  else if (newZone === '待测试区') newStatus = '待测试'
  else if (newZone === '报废区') newStatus = '报废'
  else if (newZone === '异常待确认区') newStatus = '异常'
  updateRoller(viewingId, { zone: newZone, status: newStatus })
  openDetail(viewingId)
  render()
})

document.getElementById('btnEdit').addEventListener('click', function() {
  if (!viewingId) return
  closeDetail()
  openModal(viewingId)
})

document.getElementById('btnDelete').addEventListener('click', function() {
  if (!viewingId) return
  if (confirm('确定要删除涂布轮 ' + getById(viewingId).code + ' 吗？此操作不可恢复。')) {
    deleteRoller(viewingId)
    closeDetail()
    render()
  }
})

// 启动
loadData()
